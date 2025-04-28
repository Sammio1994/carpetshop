const express = require('express');
const router = express.Router();

// Sample cart data management
let cart = []; // In-memory cart

// Add carpet to cart
router.post('/add', (req, res) => {
  const { carpetId } = req.body;
  cart.push(carpetId);
  res.status(200).json({ message: 'Carpet added to cart' });
});

// Get current cart
router.get('/', (req, res) => {
  res.json(cart);
});

module.exports = router;