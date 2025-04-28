const Order = require('../models/orderModel');

// 🛰️ Place a new order
const placeOrder = async (req, res) => {
  const { customer, cart, samples } = req.body;

  try {
    const newOrder = new Order({
      customer,
      cart,
      samples,
      createdAt: new Date()
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully', order: savedOrder });
  } catch (error) {
    console.error('❌ Order error:', error);
    res.status(500).json({ message: 'Failed to place order', error });
  }
};

// 🧾 Get orders for the currently logged-in user
const getUserOrders = async (req, res) => {
  try {
    const userEmail = req.user?.email;
    if (!userEmail) {
      return res.status(400).json({ message: 'Missing user email from token' });
    }

    const orders = await Order.find({ 'customer.email': userEmail }).sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error("❌ Error fetching user orders:", error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    console.error('❌ Admin fetch error:', err);
    res.status(500).json({ message: 'Failed to fetch all orders' });
  }
};

module.exports = { placeOrder, getUserOrders, getAllOrders };