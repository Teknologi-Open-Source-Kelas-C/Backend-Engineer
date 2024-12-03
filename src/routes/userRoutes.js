const express = require('express');
const { getAllUsers, updateRoleUser, deleteUser, getUserRoleDosen, getUserById } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.get('/', authorize('admin'), getAllUsers);
router.get('/dosen',authorize('admin'), getUserRoleDosen)
router.get('/:id', authorize('admin'), getUserById);
router.put('/:id', authorize('admin'), updateRoleUser);
router.delete('/:id', authorize('admin'), deleteUser);

module.exports = router;