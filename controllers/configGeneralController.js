const { Configuracion } = require('../models');

// GET /api/configuracion
exports.obtener = async (req, res) => {
  try {
    const config = await Configuracion.findOne(); // solo hay una
    res.json(config);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener la configuración' });
  }
};

// POST /api/configuracion
exports.crear = async (req, res) => {
  try {
    const existe = await Configuracion.findOne();
    if (existe) return res.status(400).json({ error: 'La configuración ya existe. Usa PUT para actualizar.' });

    const nueva = await Configuracion.create(req.body);
    res.status(201).json({ mensaje: 'Configuración creada', config: nueva });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear configuración' });
  }
};

// PUT /api/configuracion
exports.actualizar = async (req, res) => {
  try {
    const config = await Configuracion.findOne();
    if (!config) return res.status(404).json({ error: 'Configuración no encontrada' });

    await config.update(req.body);
    res.json({ mensaje: 'Configuración actualizada', config });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar configuración' });
  }
};

// DELETE /api/configuracion (opcional, no siempre se borra)
exports.eliminar = async (req, res) => {
  try {
    const config = await Configuracion.findOne();
    if (!config) return res.status(404).json({ error: 'No existe configuración' });

    await config.destroy();
    res.json({ mensaje: 'Configuración eliminada' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar configuración' });
  }
};
