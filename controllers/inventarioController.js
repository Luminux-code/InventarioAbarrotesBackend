// controllers/dashboardController.js

const { Op, fn, col } = require('sequelize');
const { MovimientoCaja } = require('../models');

exports.getResumenCajaMes = async (req, res) => {
  try {
    const inicioMes = new Date();
    inicioMes.setDate(1);
    inicioMes.setHours(0, 0, 0, 0);

    const finMes = new Date();
    finMes.setMonth(finMes.getMonth() + 1);
    finMes.setDate(0);
    finMes.setHours(23, 59, 59, 999);

    const movimientos = await MovimientoCaja.findAll({
      where: {
        fecha: {
          [Op.between]: [inicioMes, finMes]
        }
      },
      attributes: [
        'tipo',
        'subtipo',
        [fn('SUM', col('monto')), 'total']
      ],
      group: ['tipo', 'subtipo']
    });

    res.json({ movimientos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener resumen de caja del mes.' });
  }
};
