const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/medidaController');
const auth = require('../middlewares/authMiddleware');
const onlyAdmin = require('../middlewares/onlyAdmin');

router.use(auth, onlyAdmin);

router.get('/', ctrl.listar);
router.post('/', ctrl.crear);
router.put('/:id', ctrl.actualizar);
router.delete('/:id', ctrl.eliminar);

module.exports = router;
