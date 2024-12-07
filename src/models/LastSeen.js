const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Matakuliah = require('./Matakuliah');

const LastSeen = sequelize.define('LastSeen', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  matakuliahId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  viewedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
}, {
  indexes: [
    {
      unique: true,
      fields: ['userId', 'matakuliahId'],
    },
  ],
  tableName: 'last_seen', // Optional, untuk menyesuaikan nama tabel
  timestamps: false, // Nonaktifkan otomatis createdAt/updatedAt
});

// Relasi
LastSeen.belongsTo(User, { foreignKey: 'userId', as: 'user' });
LastSeen.belongsTo(Matakuliah, { foreignKey: 'matakuliahId', as: 'matakuliah' });

module.exports = LastSeen;
