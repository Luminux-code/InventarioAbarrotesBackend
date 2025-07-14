const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const auth = require('../middlewares/authMiddleware');
const onlyAdmin = require('../middlewares/onlyAdmin');

router.use(auth, onlyAdmin);

router.get('/', productoController.listar);
router.get('/:id', productoController.obtener);
router.post('/', productoController.crear);
router.put('/:id', productoController.actualizar);
router.delete('/:id', productoController.eliminar);

module.exports = router;
