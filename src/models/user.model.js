const {DataTypes } = require('sequelize');
const {sequelize} = require('../models/sqlite.db');

exports.User = sequelize.define('User', {
  // Model attributes are defined here
  // isAdmin: {
  //   type: DataTypes.BOOLEAN,
  //   primaryKey: false,
  //   allowNull: false,
  //   nonNullable: true
  // },
  id_user: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  nickname: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  age : {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
},{
  tableName: 'User'
});

