const { User } = require('../models');
const bcrypt = require('bcrypt');

// GET /api/users
exports.obtenerUsuarios = async (req, res) => {
  const usuarios = await User.findAll({ attributes: { exclude: ['password'] } });
  res.json(usuarios);
};

// GET /api/users/:id
exports.obtenerUsuarioPorId = async (req, res) => {
  const usuario = await User.findByPk(req.params.id, { attributes: { exclude: ['password'] } });
  if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
  res.json(usuario);
};

// POST /api/users
exports.crearUsuario = async (req, res) => {
  const { nombre, apellido, email, password, numero, direccion, rol } = req.body;

  try {
    const existe = await User.findOne({ where: { email } });
    if (existe) return res.status(400).json({ error: 'Email ya registrado' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const nuevo = await User.create({
      nombre,
      apellido,
      email,
      password: hashedPassword,
      numero,
      direccion,
      rol
    });

    res.status(201).json({ mensaje: 'Usuario creado', user: { id: nuevo.id, email: nuevo.email } });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear usuario' });
  }
};

// PUT /api/users/:id
exports.actualizarUsuario = async (req, res) => {
  const { nombre, apellido, email, numero, direccion, rol } = req.body;

  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    // Actualiza solo si se proporciona
    user.nombre = nombre ?? user.nombre;
    user.apellido = apellido ?? user.apellido;
    user.email = email ?? user.email;
    user.numero = numero ?? user.numero;
    user.direccion = direccion ?? user.direccion;
    user.rol = rol ?? user.rol;

    await user.save();

    res.json({ mensaje: 'Usuario actualizado', user });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
};

// DELETE /api/users/:id
exports.eliminarUsuario = async (req, res) => {
  try {
    const eliminado = await User.destroy({ where: { id: req.params.id } });
    if (!eliminado) return res.status(404).json({ error: 'Usuario no encontrado' });

    res.json({ mensaje: 'Usuario eliminado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
};
