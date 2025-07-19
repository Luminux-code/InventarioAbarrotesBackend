// routes/inventario.js

const express = require('express');
const router = express.Router();
const inventarioController = require('../controllers/inventarioController');
const authMiddleware = require('../middlewares/authMiddleware');

// Ruta para obtener el resumen de inventario por mes y año
router.get('/resumen-mensual', authMiddleware, inventarioController.getResumenInventarioMensual);

module.exports = router;
