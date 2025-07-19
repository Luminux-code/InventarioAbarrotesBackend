const express = require('express');
const router = express.Router();
const { reporteVentas, reporteCaja } = require('../controllers/reporteController');
const authMiddleware = require('../middlewares/authMiddleware');
const onlyAdmin = require('../middlewares/onlyAdmin');

router.get('/ventas', authMiddleware, onlyAdmin, reporteVentas);
router.get('/caja', authMiddleware, onlyAdmin, reporteCaja);

module.exports = router;
