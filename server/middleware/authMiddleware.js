const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};


const adminOnly = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();  // Allow access if the user is an admin
  } else {
    return res.status(403).json({ message: 'Access denied: Admins only' });  // Block non-admins
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Attach the decoded token to the request object

    if (req.user.isAdmin) {
      next();  // Proceed to the next route handler if the user is an admin
    } else {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = { protect, adminOnly };