
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const onlyAdmin = require('../middlewares/onlyAdmin');

// Todas las rutas protegidas por JWT y solo para admin
router.use(authMiddleware);
router.use(onlyAdmin);

router.get('/', userController.obtenerUsuarios);
router.get('/:id', userController.obtenerUsuarioPorId);
router.post('/', userController.crearUsuario);
router.put('/:id', userController.actualizarUsuario);
router.delete('/:id', userController.eliminarUsuario);

module.exports = router;
