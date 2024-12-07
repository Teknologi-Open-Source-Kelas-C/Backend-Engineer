const LastSeen = require('../models/LastSeen');
const Matakuliah = require('../models/Matakuliah');

exports.getLastSeen = async (req, res) => {
  try {
    const userId = req.user.id;// ID pengguna dari middleware autentikasi

    const lastSeenData = await LastSeen.findAll({
      where: {userId},
      include: [
        {
          model: Matakuliah,
          as: 'matakuliah',
          attributes: ['id', 'nama', 'kode', 'semester'],
        }
      ],
      order: [['viewedAt', 'DESC']],
    });

    if(!lastSeenData || lastSeenData.length === 0){
      return res.status(200).json({ message: 'Belum pernah melihat matakuliah' });
    }

    res.status(200).json({ message: 'Berhasil mengambil data last seen', data: lastSeenData });
  } catch (error) {
    console.error('Error fetching last seen:', error);
    res.status(500).json({ message: 'Error fetching last seen' });
  }
}

exports.saveLastSeen = async (req, res, next) => {
  try {
    const userId = req.user.id;// ID pengguna dari middleware autentikasi
    const matakuliahId = req.params.id;  // ID matakuliah dari parameter rute 

    // Simpan atau perbarui data LastSeen
    await LastSeen.upsert({
      userId,
      matakuliahId,
      viewedAt: new Date(),
    });

    // dapatkan semua lastSEeng untuk user tersebut, diurutkan dari yang terbaru
    const lastSeenData = await LastSeen.findAll({
      where: { userId },
      order: [['viewedAt', 'DESC']],
    });

    // Jika data melebihi batas 5, hapus yang lama
    if (lastSeenData.length > 5) {
      const toDelete = lastSeenData.slice(5); // Ambil data dari indeks ke-5 ke belakang
      const toDeleteIds = toDelete.map((item) => item.id); // Ambil ID yang akan dihapus
      await LastSeen.destroy({ where: { id: toDeleteIds } }); // Hapus data lama
    }

    next();
  } catch (error) {
    console.error('Error saving last seen:', error);
    res.status(500).json({ message: 'Error saving last seen' });
  }
}