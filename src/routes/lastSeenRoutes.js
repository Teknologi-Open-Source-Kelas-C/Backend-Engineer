const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const { getLastSeen } = require('../controllers/lastSeenController');

const router = express.Router();

router.use(protect);

router.get('/',  getLastSeen);

module.exports = router;