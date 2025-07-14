const { Producto, Categoria, Medida } = require('../models');

// GET /api/productos
exports.listar = async (req, res) => {
  try {
    const productos = await Producto.findAll({
      include: [Categoria, Medida],
    });
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: 'Error al listar productos' });
  }
};

// GET /api/productos/:id
exports.obtener = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id, {
      include: [Categoria, Medida],
    });
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(producto);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener producto' });
  }
};

// POST /api/productos
exports.crear = async (req, res) => {
  try {
    const nuevo = await Producto.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear producto' });
  }
};

// PUT /api/productos/:id
exports.actualizar = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });

    await producto.update(req.body);
    res.json(producto);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
};

// DELETE /api/productos/:id
exports.eliminar = async (req, res) => {
  try {
    const eliminado = await Producto.destroy({ where: { id: req.params.id } });
    if (!eliminado) return res.status(404).json({ error: 'Producto no encontrado' });

    res.json({ mensaje: 'Producto eliminado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
};
