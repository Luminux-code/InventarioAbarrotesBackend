const express = require('express');
const router = express.Router();
const configCtrl = require('../controllers/configGeneralController');
const authMiddleware = require('../middlewares/authMiddleware');
const onlyAdmin = require('../middlewares/onlyAdmin');

router.use(authMiddleware);
router.use(onlyAdmin);

router.get('/', configCtrl.obtener);
router.post('/', configCtrl.crear);
router.put('/', configCtrl.actualizar);
router.delete('/', configCtrl.eliminar); // opcional

module.exports = router;
