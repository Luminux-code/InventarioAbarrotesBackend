const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET || "clave_secreta_segura";

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token no proporcionado" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Token inválido o expirado" });
  }
};
