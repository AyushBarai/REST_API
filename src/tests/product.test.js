// tests/product.test.js
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Product = require('../models/product');

// Jest setup
beforeAll(async () => {
  // Connect to MongoDB once before all tests
  mongoose.set('strictQuery', false);
  await mongoose.connect('mongodb://localhost:27017/REST_API_TEST', {});
});

afterAll(async () => {
  // Close the MongoDB connection after all tests
  await mongoose.connection.close();
});


beforeEach(async () => {
  await Product.deleteMany();
});

describe('Product API', () => {
  it('should create a new product', async () => {
    const response = await request(app)
      .post('/api/products')
      .send({
        name: 'Test Product',
        description: 'This is a test product.',
        price: 19.99,
        variants: [
          { name: 'Variant 1', sku: 'SKU123', additionalCost: 5.99, stockCount: 50 },
          { name: 'Variant 2', sku: 'SKU456', additionalCost: 7.99, stockCount: 30 },
        ],
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.name).toBe('Test Product');
  });

  it('should get all products', async () => {
    await Product.create({
      name: 'Existing Product',
      description: 'This is an existing product.',
      price: 29.99,
      variants: [{ name: 'Variant 1', sku: 'SKU789', additionalCost: 3.99, stockCount: 20 }],
    });

    const response = await request(app).get('/api/products');

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].name).toBe('Existing Product');
  });

  it('should get a product by ID', async () => {
    const product = await Product.create({
      name: 'Product to Get',
      description: 'This is a product to get by ID.',
      price: 39.99,
      variants: [{ name: 'Variant 1', sku: 'SKU999', additionalCost: 2.99, stockCount: 10 }],
    });

    const response = await request(app).get(`/api/products/${product._id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('Product to Get');
  });

  it('should update a product', async () => {
    const product = await Product.create({
      name: 'Product to Update',
      description: 'This is a product to update.',
      price: 49.99,
      variants: [{ name: 'Variant 1', sku: 'SKU111', additionalCost: 4.99, stockCount: 15 }],
    });

    const response = await request(app)
      .put(`/api/products/${product._id}`)
      .send({
        name: 'Updated Product',
        description: 'This is the updated product.',
        price: 59.99,
        variants: [{ name: 'Updated Variant', sku: 'SKU222', additionalCost: 6.99, stockCount: 25 }],
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('Updated Product');
  });

  it('should delete a product', async () => {
    const product = await Product.create({
      name: 'Product to Delete',
      description: 'This is a product to delete.',
      price: 69.99,
      variants: [{ name: 'Variant 1', sku: 'SKU333', additionalCost: 8.99, stockCount: 5 }],
    });

    const response = await request(app).delete(`/api/products/${product._id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Product deleted successfully');
  });
});

describe('Search Functionality', () => {
  it('should search for products', async () => {
    await Product.create({
      name: 'Searchable Product 1',
      description: 'This is a product for searching.',
      price: 79.99,
      variants: [{ name: 'Variant 1', sku: 'SEARCH123', additionalCost: 1.99, stockCount: 8 }],
    });

    await Product.create({
      name: 'Searchable Product 2',
      description: 'This is another product for searching.',
      price: 89.99,
      variants: [{ name: 'Variant 2', sku: 'SEARCH456', additionalCost: 3.99, stockCount: 12 }],
    });

    const response = await request(app).get('/api/products/search/Searchable');

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0].name).toContain('Searchable');
    expect(response.body[1].name).toContain('Searchable');
  });


});
