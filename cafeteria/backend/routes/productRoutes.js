const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  createProduct
} = require('../controllers/productController');

// GET /api/products
router.get('/products', getAllProducts);

// POST /api/products
router.post('/products', createProduct);

module.exports = router;
