const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');
const auth = require('../middlewares/authMiddleware');
const onlyAdmin = require('../middlewares/onlyAdmin');

router.use(auth, onlyAdmin);

router.get('/', categoriaController.listar);
router.get('/:id', categoriaController.obtener);
router.post('/', categoriaController.crear);
router.put('/:id', categoriaController.actualizar);
router.delete('/:id', categoriaController.eliminar);

module.exports = router;
