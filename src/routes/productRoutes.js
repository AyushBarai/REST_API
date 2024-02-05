// src/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/products', productController.createProduct);
router.get('/products', productController.getAllProducts);
router.get('/products/:productId', productController.getProductById);
router.put('/products/:productId', productController.updateProduct);
router.delete('/products/:productId', productController.deleteProduct);

router.get('/products/search/:query', productController.searchProducts);

module.exports = router;
