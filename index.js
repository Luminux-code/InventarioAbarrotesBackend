// index.js
const express = require('express');
const app = express();
require('dotenv').config();
const db = require('./config/database');
const { sequelize } = require('./models'); // Asegúrate de exportarlo en models/index.js

sequelize.sync({alter:true}) // crea las tablas si no existen
  .then(() => {
    console.log('🟢 Tablas sincronizadas correctamente');
  })
  .catch((err) => {
    console.error('🔴 Error al sincronizar las tablas:', err);
  });

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

app.get('/test-db', async (req, res) => {
  try {
    const [results] = await db.query('SELECT 1 + 1 AS resultado');
    res.json(results[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/test-post', (req, res) => {
  console.log("📩 POST recibido en /api/test-post:", req.body);
  res.json({
    mensaje: "POST recibido correctamente",
    datos: req.body
  });
});

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);

const configGeneralRoutes = require('./routes/configGeneral');
app.use('/api/configuracion', configGeneralRoutes);

const medidaRoutes = require('./routes/medida');
const categoriaRoutes = require('./routes/categoria');
const productoRoutes = require('./routes/producto');
app.use('/api/medidas', medidaRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/productos', productoRoutes);

const cajaRoutes = require('./routes/caja');
app.use('/api/caja', cajaRoutes);

const ventasRoutes = require('./routes/ventas');
app.use('/api/ventas', ventasRoutes);

const compraRoutes = require('./compra');
app.use('/compras', compraRoutes);

const proveedorRoutes = require('./routes/proveedor');
app.use('/proveedores', proveedorRoutes);

const inventarioRoutes = require('./routes/inventario');
app.use('/inventario', inventarioRoutes);

const dashboardRoutes = require('./routes/dashboard');
app.use('/api/dashboard', dashboardRoutes);


const comprobanteRoutes = require('./routes/comprobantes');
const reporteRoutes = require('./routes/reportes');
app.use('/api/comprobantes', comprobanteRoutes);
app.use('/api/reportes', reporteRoutes);

// Ruta protegida con JWT
const authMiddleware = require('./middlewares/authMiddleware');
app.get('/api/privado', authMiddleware, (req, res) => {
  res.json({ mensaje: 'Acceso concedido', usuario: req.user });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
