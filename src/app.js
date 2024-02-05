// src/app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

// Connect to MongoDB (ensure MongoDB is running)
mongoose.set('strictQuery', false);
const dbUrl = 'mongodb://localhost:27017/REST_API_TEST'; // Use your actual MongoDB URL
mongoose.connect(dbUrl, {});

// Routes
app.use('/api', productRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'An unexpected error occurred on the server. Please try again later.' });
});

// app.listen(PORT, () => {
//   console.log(`Server is listening on http://localhost:${PORT}`);
// });

// Export app for testing
module.exports = app;
