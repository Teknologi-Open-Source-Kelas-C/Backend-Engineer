const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const { countAllTable } = require('../controllers/countController');

const router = express.Router();

router.use(protect);

router.get('/', authorize('admin'),  countAllTable);

module.exports = router;