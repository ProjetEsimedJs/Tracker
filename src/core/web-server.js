const express = require('express');
const { initializeConfigMiddlewares, initializeErrorMiddlwares } = require('./middlewares');
const userRoutes = require('../controllers/user.routes');
const levelRoutes = require('../controllers/level.route');
const loginRoutes = require('../controllers/auth.route');
const taskRoutes = require('../controllers/task.route');
const { sequelize } = require('../models/sqlite.db');
const dotenv = require('dotenv');
const {User} = require("../models/user.model");
const {Task} = require("../models/task.model");
const {Level} = require("../models/level.model");
const {User_level} = require("../models/user_level.model");
const {User_task} = require("../models/user_task.model");

class WebServer {
  app = undefined;
  port = 3000;
  server = undefined;

  constructor() {
    this.app = express();
    // User.belongsToMany(Level, {through: User_level, foreignKey : 'id_user'});
    // User.belongsToMany(Task, {through: User_task, foreignKey : 'id_user'});
    // Task.belongsToMany(Level, {through: User_task, foreignKey : 'id_level'});
    dotenv.config()
    // sequelize.sync();
   sequelize.sync({force:true});

    initializeConfigMiddlewares(this.app);
    this._initializeRoutes();
    initializeErrorMiddlwares(this.app);
  }

  start() {
    this.server = this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}`);
    });
    console.log(process.env.NODE_ENV);
  }

  stop() {
    this.server.close();
  }

  _initializeRoutes() {
    this.app.use('/users', userRoutes.initializeRoutes());
    this.app.use('/auth', loginRoutes.initializeRoutes());
    this.app.use('/level', levelRoutes.initializeRoutes());
    this.app.use('/task', taskRoutes.initializeRoutes());
  }
}

module.exports = WebServer;