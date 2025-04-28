const express = require('express');
const router = express.Router();
const { placeOrder, getUserOrders } = require('../controllers/orderController');
const { protect, adminOnly } = require('../middleware/authMiddleware'); // Fix import here
const { getAllOrdersForAdmin, promoteUserToAdmin } = require('../controllers/adminController');

// Order routes for normal users and admin
router.post('/', protect, placeOrder); // ✅ Protected create

router.get('/', protect, getUserOrders); // Protected route to get user orders
router.get('/admin/orders', protect, adminOnly, getAllOrdersForAdmin); // Admin-only route for all orders
router.put('/promote/:id', protect, adminOnly, promoteUserToAdmin); // Admin-only route for promoting users

module.exports = router;