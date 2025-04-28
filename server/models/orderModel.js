const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: {
    name: String,
    email: String,
    phone: String,
    address: String,
  },
  cart: [
    {
      id: String,
      name: String,
      price: Number,
      material: String,
      squareFeet: Number,
      imageUrl: String,
    }
  ],
  samples: [
    {
      id: String,
      name: String,
      imageUrl: String,
      room: String,
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;