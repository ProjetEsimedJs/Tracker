const {DataTypes } = require('sequelize');
const {sequelize} = require('../models/sqlite.db');

exports.User_level = sequelize.define('User_level', {
    // Model attributes are defined here
    id_user_level: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },

    id_user: {
        type: DataTypes.STRING,
        foreignKey: true,
        allowNull: false
    },

    id_level: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false
    },
    level_date_start: {
        type: DataTypes.DATE,
        timestamp: true,
        allowNull: false
    },
    level_date_end: {
        type: DataTypes.DATE,
        timestamp: true,
        allowNull: false
    },
},{
    tableName: 'User_level'
});
//belongsToMany(models.User, { through: 'id_user' });
