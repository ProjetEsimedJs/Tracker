const {DataTypes } = require('sequelize');
const {sequelize} = require('./database')

exports.Calendar_event = sequelize.define('Calendar_event', {
    // Model attributes are defined here
    id_event_calendar: {
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

    date_event: {
        type: DataTypes.DATE,
        timestamp: true,
        allowNull: false,
    },

    title_event: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
},{
    tableName: 'Calendar_event'
});