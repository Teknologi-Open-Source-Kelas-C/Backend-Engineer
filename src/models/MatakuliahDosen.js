const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Matakuliah = require('./Matakuliah');

const MatakuliahDosen = sequelize.define('MatakuliahDosen', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  matakuliahId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  dosenId: {
    type: DataTypes.UUID,
    allowNull: false
  }
}, {
  tableName: 'matakuliah_dosen'
});



module.exports = MatakuliahDosen;