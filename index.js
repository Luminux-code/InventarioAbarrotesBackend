// index.js
const express = require('express');
const app = express();
require('dotenv').config();
const db = require('./config/database');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

app.get('/test-db', (req, res) => {
  connection.query('SELECT 1 + 1 AS resultado', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results[0]);
  });
});

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Ruta protegida con JWT
const authMiddleware = require('./middlewares/authMiddleware');
app.get('/api/privado', authMiddleware, (req, res) => {
  res.json({ mensaje: 'Acceso concedido', usuario: req.user });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
