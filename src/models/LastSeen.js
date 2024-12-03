const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Matakuliah = require('./Matakuliah');

const LastSeen = sequelize.define('LastSeen', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  matakuliahId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Matakuliah,
      key: 'id'
    }
  },
  LastSeen: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  }
}, {
  indexes: [
    {
      unique: true,
      fields: ['userId', 'matakuliahId']
    }
  ]
});

LastSeen.belongsTo(User, { foreignKey: 'userId', as: 'user' });
LastSeen.belongsTo(Matakuliah, { foreignKey: 'matakuliahId', as: 'matakuliah' });

module.exports = LastSeen;