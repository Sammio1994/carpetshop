const User = require('../models/userModel');

// ✅ Promotes the user by ID
const promoteToAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, { isAdmin: true }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User promoted to admin', user: updatedUser });
  } catch (err) {
    console.error('❌ Promotion error:', err);
    res.status(500).json({ message: 'Failed to promote user', error: err.message });
  }
};

module.exports = { promoteToAdmin };