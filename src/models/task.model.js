const {DataTypes } = require('sequelize');
const {sequelize} = require('./database');

exports.Task = sequelize.define('Task', {
    // Model attributes are defined here
    id_task: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    id_level: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false
    },
    name_task: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
},{
    tableName: 'Task'
});
