const express = require('express');
const { DateTime } = require('luxon');
var cors = require('cors');
var { expressjwt: jwt } = require("express-jwt");
require('dotenv').config();


const middlewarePermissionsErrors = (app) => {
  app.use(function (err, req, res, next) {

  });
};

const initJsonHandlerMiddlware = (app) => app.use(express.json());
const middlewareStatic = (app) => app.use(express.static('public'));
const middlewareCors = (app) => app.use(cors());

const initLoggerMiddlware = (app) => {
  app.use((req, res, next) => {
    const begin = new DateTime(new Date());

    res.on('finish', () => {
      const requestDate = begin.toString();
      const remoteIP = `IP: ${req.connection.remoteAddress}`;
      const httpInfo = `${req.method} ${req.baseUrl || req.path}`;

      const end = new DateTime(new Date());
      const requestDurationMs = end.diff(begin).toMillis();
      const requestDuration = `Duration: ${requestDurationMs}ms`;

      console.log(`[${requestDate}] - [${remoteIP}] - [${httpInfo}] - [${requestDuration}]`);
    })
    next();
  });
};

const tokenMiddlware = (app) => {
  app.use(
      jwt({
        secret: process.env.SECRET_KEY,
        algorithms: ["HS256"],
      }).unless(
          { path: [{ url: "/users/create", methods: ["POST"] },
                  { url: "/auth/login", methods: ["POST"] },
                  { url: "/users/seeder-user", methods: ["POST"] },
                  { url: "/calendar-event/seeder-calendar", methods: ["POST"] },
                  { url: "/levels/seeder-level", methods: ["POST"] },
                  { url: "/tasks/seeder-task", methods: ["POST"] },
                  { url: "/user-level/seeder-level-user", methods: ["POST"] },
                  { url: "/levels/post", methods: ["POST"]},
                  { url: "/tasks/post", methods: ["POST"]},
                  { url: "/tasks/deleteTasks", methods: ["DELETE"]},
                  { url: "/user-task/seeder-task-user", methods: ["POST"] }] }),
  );
}

exports.initializeConfigMiddlewares = (app) => {
  initJsonHandlerMiddlware(app);
  initLoggerMiddlware(app);
  middlewareStatic(app);
  middlewareCors(app);
  middlewarePermissionsErrors(app);
  tokenMiddlware(app);

}

exports.initializeErrorMiddlwares = (app) => {
  app.use((err, req, res, next) => {
    if (err.code === 'permission_denied') {
      res.status(403).send('Forbidden');
      return
    }
    console.log(err)
    res.status(500).send(err.message);
  });
}
