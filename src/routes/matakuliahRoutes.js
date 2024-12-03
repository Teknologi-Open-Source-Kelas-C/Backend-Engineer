const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const {
  createMatakuliah,
  getAllMatakuliah,
  getMatakuliahById,
  updateMatakuliah,
  deleteMatakuliah,
  getMatakuliahDosen
} = require('../controllers/matakuliahController');

const router = express.Router();

router.use(protect);

router
.route('/')
.post(authorize('admin'),createMatakuliah)
.get(getAllMatakuliah);

router.get('/dosen',authorize('dosen', 'admin'), getMatakuliahDosen);
router
.route('/:id')
.get(getMatakuliahById)
.put(authorize('admin'),updateMatakuliah)
.delete(authorize('admin'),deleteMatakuliah);


module.exports = router;