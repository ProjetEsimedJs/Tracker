const {Sequelize} = require ('sequelize')
exports.sequelize = new Sequelize(process.env.DATABASE_NAME,process.env.APP_DB, process.env.PASSWORD_DB,{
    host: process.env.HOST,
    dialect: process.env.DIALECT,
  });