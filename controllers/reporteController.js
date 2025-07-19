const { Venta, Compra, Producto, MovimientoCaja } = require('../models');
const { Op } = require('sequelize');

exports.reporteVentas = async (req, res) => {
  const { desde, hasta } = req.query;
  try {
    const ventas = await Venta.findAll({
      where: {
        fecha: {
          [Op.between]: [new Date(desde), new Date(hasta)]
        }
      },
      include: ['usuario']
    });
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.reporteCaja = async (req, res) => {
  try {
    const movimientos = await MovimientoCaja.findAll();
    res.json(movimientos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Puedes seguir con otros: reporteCompras, reporteKardex, etc.
