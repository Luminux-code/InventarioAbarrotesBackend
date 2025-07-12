const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models"); // asegúrate de importar el modelo

const SECRET_KEY = process.env.JWT_SECRET || "clave_secreta_segura";

exports.register = async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    const existe = await User.findOne({ where: { email } });
    if (existe) return res.status(400).json({ error: "El usuario ya existe" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      nombre,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ mensaje: "Usuario registrado", user: { id: user.id, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: "Error en el servidor" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ error: "Email incorrecto" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: "Contraseña incorrecta" });

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

    res.json({ mensaje: "Login exitoso", token });
  } catch (err) {
    res.status(500).json({ error: "Error en el servidor" });
  }
};
