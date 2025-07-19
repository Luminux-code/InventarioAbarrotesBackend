const express = require('express');
const router = express.Router();
const { generarComprobante } = require('../controllers/comprobanteController');
const authMiddleware = require('../middlewares/authMiddleware');
const onlyAdmin = require('../middlewares/onlyAdmin');

router.post('/', authMiddleware, onlyAdmin, generarComprobante);

module.exports = router;
