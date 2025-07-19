// controllers/inventarioController.js

const { Producto, DetalleVenta, DetalleCompra } = require('../models');
const { Op } = require('sequelize');

exports.getResumenInventarioMensual = async (req, res) => {
  try {
    const { mes, anio } = req.query;

    if (!mes || !anio) {
      return res.status(400).json({ message: 'Debe proporcionar mes y año.' });
    }

    const fechaInicio = new Date(`${anio}-${mes}-01`);
    const fechaFin = new Date(fechaInicio);
    fechaFin.setMonth(fechaFin.getMonth() + 1);

    // Obtener ventas por producto
    const ventas = await DetalleVenta.findAll({
      attributes: ['productoId', [sequelize.fn('SUM', sequelize.col('cantidad')), 'cantidadVendida']],
      include: [{ model: Producto, attributes: ['nombre'] }],
      where: {
        createdAt: { [Op.between]: [fechaInicio, fechaFin] }
      },
      group: ['productoId', 'Producto.id']
    });

    // Obtener compras por producto
    const compras = await DetalleCompra.findAll({
      attributes: ['productoId', [sequelize.fn('SUM', sequelize.col('cantidad')), 'cantidadComprada']],
      include: [{ model: Producto, attributes: ['nombre'] }],
      where: {
        createdAt: { [Op.between]: [fechaInicio, fechaFin] }
      },
      group: ['productoId', 'Producto.id']
    });

    return res.json({ ventas, compras });

  } catch (error) {
    console.error('Error al obtener resumen del inventario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
