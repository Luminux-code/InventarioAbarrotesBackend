// middlewares/onlyAdmin.js
module.exports = (req, res, next) => {
  if (req.user.rol !== 'gerente') {
    return res.status(403).json({ error: 'Acceso restringido a administradores' });
  }
  next();
};
