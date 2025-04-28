const express = require('express'); 
const router = express.Router(); 
const { promoteToAdmin } = require('../controllers/userController');
const { registerUser, loginUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/signup', registerUser);

router.post('/login', loginUser);

router.put('/promote/:id', protect, promoteToAdmin);

module.exports = router;