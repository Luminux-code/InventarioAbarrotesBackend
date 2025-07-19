const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/compraController');
const auth = require('../middlewares/auth'); // si usas JWT

router.post('/', auth, ctrl.crearCompra);
router.get('/', auth, ctrl.listarCompras);
router.put('/:id', auth, ctrl.editarCompra);
router.delete('/:id', auth, ctrl.borrarCompra);

module.exports = router;
