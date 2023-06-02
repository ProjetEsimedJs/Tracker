const {DataTypes } = require('sequelize');
const {sequelize} = require('./database');

exports.User = sequelize.define('User', {
  id_user: {
    type: DataTypes.STRING(255),
    primaryKey: true,
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING(70),
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING(70),
    allowNull: false
  },
  nickname: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  age : {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(70),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
},{
  tableName: 'User'
});

