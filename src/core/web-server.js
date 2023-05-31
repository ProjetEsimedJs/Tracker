const express = require('express');
const { initializeConfigMiddlewares, initializeErrorMiddlwares } = require('./middlewares');
const userRoutes = require('../controllers/user.routes');
const loginRoutes = require('../controllers/auth.route');
const userLevelRoutes =  require('../controllers/user-level.route');
const userTaskRoutes =  require('../controllers/user-task.route');
const levelsRoutes = require('../controllers/level.route');
const tasksRoutes = require('../controllers/task.route');
const calendarRoutes = require('../controllers/calendar-event.route');
const { sequelize } = require('../models/database');
const dotenv = require('dotenv');
const {User} = require("../models/user.model");
const {Task} = require("../models/task.model");
const {Level} = require("../models/level.model");
const {User_level} = require("../models/user_level.model");
const {User_task} = require("../models/user_task.model");
const {Calendar_event}  = require("../models/calendar_event.model");


class WebServer {
  app = process.env.APP;
  port = process.env.PORT;
  server = undefined;

  constructor() {
    this.app = express();
    User.belongsToMany(Level, {through: User_level, foreignKey : 'id_user'});
    User.belongsToMany(Task, {through: User_task, foreignKey : 'id_user'});
    User.hasMany( Calendar_event,{ foreignKey : 'id_user'});
    Task.belongsToMany(Level, {through: User_task, foreignKey : 'id_level'});
    dotenv.config()
   sequelize.sync();
    //sequelize.sync({force:true});
    initializeConfigMiddlewares(this.app);
    this._initializeRoutes();
    initializeErrorMiddlwares(this.app);
  }

  start() {
    this.server = this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}`);
    });
  }

  stop() {
    this.server.close();
  }

  _initializeRoutes() {
    this.app.use('/users', userRoutes.initializeRoutes());
    this.app.use('/auth', loginRoutes.initializeRoutes());
    this.app.use('/user-level', userLevelRoutes.initializeRoutes());
    this.app.use('/levels',levelsRoutes.initializeRoutes());
    this.app.use('/user-task',userTaskRoutes.initializeRoutes());
    this.app.use('/tasks',tasksRoutes.initializeRoutes());
    this.app.use('/calendar-event',calendarRoutes.initializeRoutes());

  }
}

module.exports = WebServer;

