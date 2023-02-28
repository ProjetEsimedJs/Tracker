const {Sequelize} = require ('sequelize')
exports.sequelize = new Sequelize('Tracker','postgres','ladmin',{
    host: 'localhost',
    dialect: 'postgres'
  });