const {DataTypes } = require('sequelize');
const {sequelize} = require('./database');

exports.User_task = sequelize.define('User_task', {
    // Model attributes are defined here
    id_user_task: {
        type: DataTypes.INTEGER,
        autoIncrement : true,
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
    id_task: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false,
    },

    task_date_start: {
        type: DataTypes.DATE,
        timestamp: true,
        //createdAt: true,
        allowNull: false
    },
    task_date_end: {
        type: DataTypes.DATE,
        timestamp: true,
        allowNull: false
    },},{
    tableName: 'User_task'
});
