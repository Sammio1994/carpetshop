const Order = require('../models/orderModel');

// Get sample requests for logged-in user
const getSampleOrders = async (req, res) => {
  try {
    const userEmail = req.user.email;
    const orders = await Order.find({
      'customer.email': userEmail,
      samples: { $exists: true, $ne: [] }
    }).sort({ createdAt: -1 });

    const samples = orders.flatMap(order => order.samples || []);
    res.status(200).json(samples);
  } catch (err) {
    console.error("❌ Error fetching sample orders:", err);
    res.status(500).json({ message: 'Failed to fetch sample requests' });
  }
};

module.exports = { getSampleOrders };