const {DataTypes } = require('sequelize');
const {sequelize} = require('../models/sqlite.db');

exports.User = sequelize.define('User', {
  // Model attributes are defined here
  isAdmin: {
    type: DataTypes.BOOLEAN,
    primaryKey: false,
    allowNull: false, 
    nonNullable: true
  },
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
});
