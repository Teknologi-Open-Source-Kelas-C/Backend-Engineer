const User = require('../models/User');
const { Op } = require('sequelize');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        role: ['mahasiswa', 'dosen']
      },
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
    });

    if (!users) {
      return res.status(404).json({ message: 'Belum ada pendaftar' });
    }

    res.status(200).json({ message: "Berhasil mengambil data user", data: users });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// get user by id
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
    });

    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    res.status(200).json({ message: "Berhasil mengambil data user", data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.getUserRoleDosen = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        role: 'dosen'
      }
    })

    if (!users) {
      return res.status(404).json({ message: 'Belum ada dosen' });
    }

    return res.status(200).json({ message: 'Berhasil mengambil list dosen', data: users })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.updateRoleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!role) {
      return res.status(400).json({ message: 'Role tidak boleh kosong' });
    }

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    await user.update({ role });

    res.status(200).json({ message: "Berhasil mengubah role user", data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    await user.destroy();

    res.status(200).json({status: 200, message: "Berhasil menghapus user", data: user });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.searchUser = async (req, res) => {
  try {
    const { keyword } = req.query;

    if (!keyword) {
      return res.status(400).json({ message: 'Keyword wajib di isi' });
    }

    const users = await User.findAll({
      where: {
        // mencari user berdasarkan query yang di cari
        nama: { [Op.like]: `%${keyword}%` },
        role: { [Op.ne]: 'admin' }
      },
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
    })

    if (users.length === 0) {
      return res.status(404).json({ message: 'Tidak dapat menemukan user' });
    }

    res.status(200).json({ message: "Berhasil mengambil data user", data: users });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}