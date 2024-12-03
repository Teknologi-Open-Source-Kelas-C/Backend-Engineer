const Modul = require('./Modul');
const User = require('./User');
const MatakuliahDosen = require('./MatakuliahDosen');
const Matakuliah = require('./Matakuliah');

MatakuliahDosen.belongsTo(Matakuliah, {
  foreignKey: 'matakuliahId',
  as: 'matakuliah'
});

// Set up associations
Matakuliah.hasMany(Modul, {
  foreignKey: 'matakuliahId',
  as: 'moduls',
  onDelete: 'CASCADE'
});

Modul.belongsTo(Matakuliah, {
  foreignKey: 'matakuliahId',
  as: 'matakuliahs'
});

// Set up User-Matakuliah relationship through MatakuliahDosen
User.belongsToMany(Matakuliah, {
  through: MatakuliahDosen,
  as: 'matakuliah',
  foreignKey: 'dosenId'
});

Matakuliah.belongsToMany(User, {
  through: MatakuliahDosen,
  as: 'dosens',
  foreignKey: 'matakuliahId'
});

module.exports = {
  Matakuliah,
  Modul,
  User,
  MatakuliahDosen
};