const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('module_kelas_c', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false 
});

module.exports = sequelize;