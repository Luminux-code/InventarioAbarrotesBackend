const express = require('express');
const router = express.Router();
const cajaController = require('../controllers/cajaController');
const auth = require('../middlewares/authMiddleware');

router.post('/abrir', auth, cajaController.abrirCaja);
router.post('/cerrar', auth, cajaController.cerrarCaja);
router.get('/historial', auth, cajaController.historialCajas);
router.post('/movimiento', auth, cajaController.agregarMovimiento);

module.exports = router;
