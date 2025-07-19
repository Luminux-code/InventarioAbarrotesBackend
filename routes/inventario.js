const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/inventarioController');
const auth = require('../middlewares/auth');

router.get('/mensual', auth, ctrl.inventarioMensual); // ?mes=07&anio=2025

module.exports = router;
