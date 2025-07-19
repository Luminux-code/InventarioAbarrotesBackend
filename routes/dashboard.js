// routes/dashboard.js

const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/resumen-caja-mensual', authMiddleware, dashboardController.getResumenCajaMes);

module.exports = router;
