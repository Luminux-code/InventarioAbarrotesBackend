const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/proveedorController');
const auth = require('../middlewares/authMiddleware'); // Protección JWT

router.get('/', auth, ctrl.listarProveedores);
router.post('/', auth, ctrl.crearProveedor);
router.put('/:id', auth, ctrl.actualizarProveedor);
router.delete('/:id', auth, ctrl.eliminarProveedor);

module.exports = router;
