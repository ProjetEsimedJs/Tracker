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
 const corsOptions = {   origin: "*",   methods:
       ['PUT'],   allowedHeaders:
       "Access-Control-Allow-Headers,Access-Control-Allow-Origin,Access-Control-Request-Method,Access-Control-Request-Headers,Origin,Cache-Control,Content-Type,X-Token,X-Refresh-Token",   credentials: true,   preflightContinue: false,
   optionsSuccessStatus: 204 };
const middlewareCors = (app) => app.use(cors(corsOptions));

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

exports.initializeConfigMiddlewares = (app) => {
  initJsonHandlerMiddlware(app);
  initLoggerMiddlware(app);
  middlewareStatic(app);
  middlewareCors(app);
  middlewarePermissionsErrors(app);

}

exports.initializeErrorMiddlwares = (app) => {
  app.use((err, req, res, next) => {
    if (err.code === 'permission_denied') {
      res.status(403).send('Forbidden');
      return
    }
    res.status(500).send(err.message);
  });
}
