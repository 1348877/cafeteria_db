// backend/routes/saleRoutes.js
const express = require("express");
const router = express.Router();
const { getSales, createSale, getSalesSummary, getTopProducts } = require("../controllers/saleController");

// Ruta para obtener historial de ventas
router.get("/sales", getSales);

// Ruta para obtener el resumen del día
router.get("/sales/summary", getSalesSummary);

// Ruta para crear una venta
router.post("/sales", createSale);

// Ruta para obtener los productos más vendidos
router.get("/top-products", getTopProducts);

module.exports = router;
