// controllers/dashboardController.js

const { MovimientoCaja, DetalleVenta, Producto } = require('../models');
const { Op, fn, col, literal } = require('sequelize');

exports.getResumenCajaMes = async (req, res) => {
  try {
    const ahora = new Date();
    const inicioMes = new Date(ahora.getFullYear(), ahora.getMonth(), 1);
    const finMes = new Date(ahora.getFullYear(), ahora.getMonth() + 1, 1);

    const ingresos = await MovimientoCaja.sum('monto', {
      where: {
        tipo: 'ingreso',
        fecha: { [Op.between]: [inicioMes, finMes] }
      }
    });

    const egresos = await MovimientoCaja.sum('monto', {
      where: {
        tipo: 'egreso',
        fecha: { [Op.between]: [inicioMes, finMes] }
      }
    });

    const resumen = {
      ingresos: ingresos || 0,
      egresos: egresos || 0,
      utilidad: (ingresos || 0) - (egresos || 0)
    };

    res.json(resumen);
  } catch (error) {
    console.error('Error al obtener resumen de caja:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

exports.getTopProductosVendidos = async (req, res) => {
  try {
    const top = await DetalleVenta.findAll({
      attributes: [
        'productoId',
        [fn('SUM', col('cantidad')), 'cantidadVendida']
      ],
      include: [{ model: Producto, attributes: ['nombre'] }],
      group: ['productoId', 'Producto.id'],
      order: [[literal('cantidadVendida'), 'DESC']],
      limit: 3
    });

    res.json(top);
  } catch (error) {
    console.error('Error al obtener top productos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
