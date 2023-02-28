const {DataTypes } = require('sequelize');
const {sequelize} = require('./database');

exports.User_level = sequelize.define('User_level', {
    // Model attributes are defined here
    id_user_level: {
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
        defaultValue: 1,
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
