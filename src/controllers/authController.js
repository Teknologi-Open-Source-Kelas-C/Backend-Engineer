const User = require('../models/User');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

exports.register = async (req, res) => {
  try {
    const { nama, email, password, role = 'mahasiswa' } = req.body;

    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: 'Email Sudah Pernah Digunakan' });
    }

    const user = await User.create({
      nama,
      email,
      password,
      role
    });

    const token = jwt.sign({ id: user.id, role: user.role}, JWT_SECRET, {
      expiresIn: '1d'
    });

    res.status(201).json({
      message: 'Selamat, anda berhasil mendaftar',
      token,
      user: {
        id: user.id,
        nama: user.nama,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user || user.role !== role) {
      return res.status(401).json({ message: 'Email, password, atau role salah' });
    }

    const isPasswordValid = await user.comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Email, password, atau role salah' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: '1d'
    });

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        nama: user.nama,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};
