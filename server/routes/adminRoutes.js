const express = require('express');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const { getAllOrdersForAdmin, promoteUserToAdmin } = require('../controllers/adminController');
const router = express.Router();

// Protect the route and allow only admins to access it
router.get('/admin/orders', protect, adminOnly, getAllOrdersForAdmin);  // Fetch orders for admin only
router.put('/promote/:id', protect, promoteUserToAdmin);  // Promote a user to admin

module.exports = router;