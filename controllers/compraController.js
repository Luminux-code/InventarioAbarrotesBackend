const { Compra, DetalleCompra, Producto, User, sequelize } = require('../models');

exports.crearCompra = async (req, res) => {
  const { productos } = req.body;
  const usuarioId = req.user.id;
  const t = await sequelize.transaction();

  try {
    let total = 0;
    const detalles = [];
    for (const item of productos) {
      const prod = await Producto.findByPk(item.productoId, { transaction: t });
      if (!prod) throw new Error(`Producto ${item.productoId} no encontrado`);
      total += prod.precio * item.cantidad;
      detalles.push({ ...item, precioUnitario: prod.precio });
    }

    const compra = await Compra.create({ total, UserId: usuarioId }, { transaction: t });
    for (const d of detalles) {
      await DetalleCompra.create({
        compraId: compra.id,
        productoId: d.productoId,
        cantidad: d.cantidad,
        precioUnitario: d.precioUnitario
      }, { transaction: t });
    }

    await t.commit();
    res.status(201).json({ compraId: compra.id });
  } catch (err) {
    await t.rollback();
    console.error(err);
    res.status(500).json({ error: 'Error al crear compra' });
  }
};

exports.listarCompras = async (req, res) => {
  try {
    const compras = await Compra.findAll({
      include: [
        { model: DetalleCompra, as: 'detalles', include: [Producto] },
        { model: User, attributes: ['nombre', 'email'] }
      ],
      order: [['fecha', 'DESC']]
    });
    res.json(compras);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al listar compras' });
  }
};

exports.editarCompra = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;
  try {
    const compra = await Compra.findByPk(id);
    if (!compra) return res.status(404).json({ error: 'Compra no encontrada' });
    compra.estado = estado;
    await compra.save();
    res.json(compra);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al editar compra' });
  }
};

exports.borrarCompra = async (req, res) => {
  const { id } = req.params;
  try {
    const borrada = await Compra.destroy({ where: { id } });
    if (!borrada) return res.status(404).json({ error: 'Compra no encontrada' });
    res.json({ mensaje: 'Compra eliminada' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar compra' });
  }
};
