const { Proveedor } = require('../models');

exports.listarProveedores = async (req, res) => {
  try {
    const proveedores = await Proveedor.findAll();
    res.json(proveedores);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar proveedores' });
  }
};

exports.crearProveedor = async (req, res) => {
  try {
    const proveedor = await Proveedor.create(req.body);
    res.status(201).json(proveedor);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear proveedor' });
  }
};

exports.actualizarProveedor = async (req, res) => {
  try {
    const { id } = req.params;
    const proveedor = await Proveedor.findByPk(id);
    if (!proveedor) return res.status(404).json({ error: 'Proveedor no encontrado' });

    await proveedor.update(req.body);
    res.json(proveedor);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar proveedor' });
  }
};

exports.eliminarProveedor = async (req, res) => {
  try {
    const { id } = req.params;
    const eliminado = await Proveedor.destroy({ where: { id } });
    if (!eliminado) return res.status(404).json({ error: 'Proveedor no encontrado' });

    res.json({ mensaje: 'Proveedor eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar proveedor' });
  }
};
