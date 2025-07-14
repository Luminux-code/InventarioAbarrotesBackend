const { Medida } = require('../models');

exports.listar = async (req, res) => {
  const medidas = await Medida.findAll();
  res.json(medidas);
};

exports.crear = async (req, res) => {
  try {
    const medida = await Medida.create(req.body);
    res.status(201).json(medida);
  } catch (err) {
    res.status(500).json({ error: 'No se pudo crear la medida' });
  }
};

exports.actualizar = async (req, res) => {
  try {
    const medida = await Medida.findByPk(req.params.id);
    if (!medida) return res.status(404).json({ error: 'No encontrado' });

    await medida.update(req.body);
    res.json(medida);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar' });
  }
};

exports.eliminar = async (req, res) => {
  try {
    const eliminado = await Medida.destroy({ where: { id: req.params.id } });
    if (!eliminado) return res.status(404).json({ error: 'No encontrado' });

    res.json({ mensaje: 'Medida eliminada' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar' });
  }
};
