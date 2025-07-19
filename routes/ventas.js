const express = require("express");
const router = express.Router();
const ventaController = require("../controllers/ventaController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, ventaController.realizarVenta);
router.get("/", authMiddleware, ventaController.listarVentas);

module.exports = router;
