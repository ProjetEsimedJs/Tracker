const {DataTypes } = require('sequelize');
const {sequelize} = require('./database');

exports.Level = sequelize.define('Level', {
    // Model attributes are defined here
    id_level: {
        type: DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey: true,
        allowNull: false

    },
    name_level: {
        type: DataTypes.STRING(200),
        allowNull: false
    },},{
    tableName: 'Level'
});
