const { Caja, MovimientoCaja } = require('../models');

exports.abrirCaja = async (req, res) => {
  const { montoApertura } = req.body;
  const usuarioId = req.user.id;

  try {
    const abierta = await Caja.findOne({ where: { estado: 'abierta' } });
    if (abierta) return res.status(400).json({ error: 'Ya hay una caja abierta' });

    const nuevaCaja = await Caja.create({
      montoApertura,
      usuarioAperturaId: usuarioId,
    });

    res.status(201).json(nuevaCaja);
  } catch (err) {
    res.status(500).json({ error: 'Error al abrir la caja' });
  }
};

exports.cerrarCaja = async (req, res) => {
  const usuarioId = req.user.id;
  const { montoCierre } = req.body;

  try {
    const caja = await Caja.findOne({ where: { estado: 'abierta' } });
    if (!caja) return res.status(404).json({ error: 'No hay caja abierta' });

    caja.estado = 'cerrada';
    caja.montoCierre = montoCierre;
    caja.usuarioCierreId = usuarioId;
    caja.fechaCierre = new Date();

    await caja.save();
    res.json({ mensaje: 'Caja cerrada', caja });
  } catch (err) {
    res.status(500).json({ error: 'Error al cerrar la caja' });
  }
};

exports.historialCajas = async (req, res) => {
  try {
    const cajas = await Caja.findAll({
      order: [['fechaApertura', 'DESC']],
      include: [{ model: MovimientoCaja }]
    });
    res.json(cajas);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el historial' });
  }
};

exports.agregarMovimiento = async (req, res) => {
  const { tipo, monto, descripcion } = req.body;
  const usuarioId = req.user.id;

  try {
    const caja = await Caja.findOne({ where: { estado: 'abierta' } });
    if (!caja) return res.status(400).json({ error: 'No hay caja abierta' });

    const movimiento = await MovimientoCaja.create({
      tipo,
      monto,
      descripcion,
      usuarioId,
      cajaId: caja.id
    });

    res.status(201).json(movimiento);
  } catch (err) {
    res.status(500).json({ error: 'Error al registrar movimiento' });
  }
};
