const express = require('express');
const { register, login, getCurrentUser } = require('../controllers/authController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/me', protect, authorize('admin'), getCurrentUser)

module.exports = router;