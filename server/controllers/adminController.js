const Order = require('../models/orderModel');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const getAllOrdersForAdmin = async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied: Admins only.' });
    }

    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch admin orders' });
  }
};

// Promote User to Admin
const promoteUserToAdmin = async (req, res) => {
  try {
    const userId = req.params.id;

    // Check if the user is promoting themselves
    if (userId !== req.user.id) {
      return res.status(403).json({ message: 'You can only promote yourself.' });
    }

    // Find the user and set isAdmin to true
    const user = await User.findByIdAndUpdate(
      userId,
      { isAdmin: true }, // Set isAdmin to true
      { new: true } // Return the updated user
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a new token with updated isAdmin field
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin }, // Ensure isAdmin is correctly set to true
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    // Send the updated token
    res.json({ message: `✅ ${user.email} promoted to admin`, token });
  } catch (error) {
    console.error('❌ Error promoting user:', error);
    res.status(500).json({ message: 'Server error promoting user' });
  }
};


module.exports = { getAllOrdersForAdmin, promoteUserToAdmin };