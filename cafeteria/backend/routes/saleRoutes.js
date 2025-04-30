const express = require("express");
const router = express.Router();
const { getSales, createSale, getTopProducts } = require("../controllers/saleController");

router.get("/sales", getSales);
router.post("/sales", createSale);
router.get("/top-products", getTopProducts);

module.exports = router;
