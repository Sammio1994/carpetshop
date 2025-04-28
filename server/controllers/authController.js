const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 🔐 Token Generator with Admin Verification
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, isAdmin: user.isAdmin || true },  // Default to false if isAdmin is not set
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};

// ✅ Register User
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please add all fields' });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ username, email, password: hashedPassword });

  try {
    const savedUser = await user.save();
    const token = generateToken(savedUser); // The token is generated with isAdmin: false initially
    res.status(201).json({ token, username: savedUser.username });
  } catch (err) {
    console.error('❌ Error saving user:', err);
    res.status(500).json({ message: 'Failed to create user', error: err.message });
  }
};

// ✅ Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = generateToken(user);  // Token with isAdmin: false by default

  res.json({ token, username: user.username });
};

module.exports = { registerUser, loginUser };