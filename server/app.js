const express = require('express');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

app.use(express.json());  // Middleware to parse JSON bodies

// Routes
app.use('/api/orders', orderRoutes);

module.exports = app;