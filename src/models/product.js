// src/models/product.js
const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  name: String,
  sku: String,
  additionalCost: Number,
  stockCount: Number,
});

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  variants: [variantSchema],
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
