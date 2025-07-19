const { Comprobante, Venta } = require('../models');

exports.generarComprobante = async (req, res) => {
  try {
    const { tipo, ventaId } = req.body;

    const venta = await Venta.findByPk(ventaId);
    if (!venta) return res.status(404).json({ error: 'Venta no encontrada' });

    const ultimo = await Comprobante.count({ where: { tipo } });
    const numero = `${tipo === 'boleta' ? 'B' : 'F'}-${ultimo + 1}`.padStart(8, '0');

    const comprobante = await Comprobante.create({ tipo, numero, ventaId });
    res.status(201).json(comprobante);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
