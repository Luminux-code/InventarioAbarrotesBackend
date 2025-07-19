// routes/dashboard.js

const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const authMiddleware = require('../middlewares/authMiddleware');

// Ruta para resumen de caja del mes actual
router.get('/resumen-caja-mensual', authMiddleware, dashboardController.getResumenCajaMes);

// Ruta para productos más vendidos
router.get('/top-productos', authMiddleware, dashboardController.getTopProductosVendidos);

module.exports = router;
