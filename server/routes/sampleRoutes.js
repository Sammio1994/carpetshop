const express = require('express');
const router = express.Router();
const { getSampleOrders } = require('../controllers/sampleController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getSampleOrders);

module.exports = router;