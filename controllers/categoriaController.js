const { Categoria } = require('../models');

// GET /api/categorias
exports.listar = async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.json(categorias);
  } catch (err) {
    res.status(500).json({ error: 'Error al listar categorías' });
  }
};

// GET /api/categorias/:id
exports.obtener = async (req, res) => {
  try {
    const categoria = await Categoria.findByPk(req.params.id);
    if (!categoria) return res.status(404).json({ error: 'Categoría no encontrada' });
    res.json(categoria);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener categoría' });
  }
};

// POST /api/categorias
exports.crear = async (req, res) => {
  try {
    const categoria = await Categoria.create(req.body);
    res.status(201).json(categoria);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear categoría' });
  }
};

// PUT /api/categorias/:id
exports.actualizar = async (req, res) => {
  try {
    const categoria = await Categoria.findByPk(req.params.id);
    if (!categoria) return res.status(404).json({ error: 'Categoría no encontrada' });

    await categoria.update(req.body);
    res.json(categoria);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar categoría' });
  }
};

// DELETE /api/categorias/:id
exports.eliminar = async (req, res) => {
  try {
    const eliminado = await Categoria.destroy({ where: { id: req.params.id } });
    if (!eliminado) return res.status(404).json({ error: 'Categoría no encontrada' });

    res.json({ mensaje: 'Categoría eliminada' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar categoría' });
  }
};
