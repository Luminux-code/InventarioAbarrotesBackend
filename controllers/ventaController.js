const { Venta, DetalleVenta, Producto, User, sequelize } = require("../models");

exports.realizarVenta = async (req, res) => {
  const { productos, metodoPago } = req.body;
  const usuarioId = req.user.id;

  const t = await sequelize.transaction();

  try {
    let total = 0;

    // Validar productos y calcular total
    const productosConInfo = [];

    for (const item of productos) {
      const producto = await Producto.findByPk(item.productoId, { transaction: t });
      if (!producto || producto.stock < item.cantidad) {
        await t.rollback();
        return res.status(400).json({
          error: `Stock insuficiente para ${producto?.nombre || 'producto desconocido'}`
        });
      }

      total += producto.precio * item.cantidad;
      productosConInfo.push({ ...item, producto });
    }

    // Crear venta
    const venta = await Venta.create({
      total,
      metodoPago,
      UserId: usuarioId
    }, { transaction: t });

    // Crear detalles y actualizar stock
    for (const item of productosConInfo) {
      await DetalleVenta.create({
        ventaId: venta.id,
        productoId: item.productoId,
        cantidad: item.cantidad,
        precioUnitario: item.producto.precio
      }, { transaction: t });

      item.producto.stock -= item.cantidad;
      await item.producto.save({ transaction: t });
    }

    await t.commit();
    res.status(201).json({ mensaje: "Venta realizada correctamente", ventaId: venta.id });

  } catch (err) {
    console.error(err);
    await t.rollback();
    res.status(500).json({ error: "Error al procesar la venta" });
  }
};

exports.listarVentas = async (req, res) => {
  try {
    const ventas = await Venta.findAll({
      include: [
        { model: DetalleVenta, as: 'detalles', include: [Producto] },
        { model: User, attributes: ['nombre', 'email'] }
      ],
      order: [['fecha', 'DESC']]
    });

    res.json(ventas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener ventas" });
  }
};

exports.anularVenta = async (req, res) => {
  const { id } = req.params;

  const t = await sequelize.transaction();

  try {
    const venta = await Venta.findByPk(id, {
      include: { model: DetalleVenta, as: 'detalles' },
      transaction: t
    });

    if (!venta) {
      await t.rollback();
      return res.status(404).json({ error: "Venta no encontrada" });
    }

    if (venta.estado === 'anulado') {
      await t.rollback();
      return res.status(400).json({ error: "La venta ya fue anulada" });
    }

    venta.estado = 'anulado';
    await venta.save({ transaction: t });

    for (const detalle of venta.detalles) {
      const producto = await Producto.findByPk(detalle.productoId, { transaction: t });
      if (producto) {
        producto.stock += detalle.cantidad;
        await producto.save({ transaction: t });
      }
    }

    await t.commit();
    res.json({ mensaje: "Venta anulada correctamente" });
  } catch (err) {
    console.error(err);
    await t.rollback();
    res.status(500).json({ error: "Error al anular la venta" });
  }
};
