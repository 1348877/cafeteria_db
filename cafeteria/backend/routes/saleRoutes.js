const express = require("express");
const router = express.Router();
const { createSale } = require("../controllers/saleController");

router.post("/sales", createSale);

module.exports = router;
