const express = require('express');
const { searchModul } = require('../controllers/modulController');
const { searchMatakuliah } = require('../controllers/matakuliahController');
const { protect, authorize } = require('../middleware/auth');
const { searchUser } = require('../controllers/userController');

const router = express.Router();

router.get('/modul', searchModul);
router.get('/matakuliah', searchMatakuliah);
router.get('/user', searchUser);  

module.exports = router;