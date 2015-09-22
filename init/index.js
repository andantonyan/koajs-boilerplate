'use strict';

var path = require('path');
var bulk = require('bulk-require');
var _ = require('lodash');

const CONFIG_PATH = path.join(__dirname, '../config');
const INIT_PATH = path.join(__dirname, '../init');

module.exports = function (app) {
  var config = bulk(CONFIG_PATH, [ '*.js']);
  var envConfig = require(path.join(CONFIG_PATH,'env', app.env));

  config = _.extend(config, envConfig);

  var logsInit = require(path.join(INIT_PATH, 'logs.js'));
  logsInit(app, config.logs);

  var logs = app.core.logs;

  logs.info('initialized', 'logs');

  var initOrder = config.init.order || [];

  initOrder.forEach((name) => {
    var initFunction = require(path.join(INIT_PATH, name));
    initFunction(app, config);
    logs.info('initialized', name);
  });

  app.config = config;

  app.listen(app.config.port);
  logs.info('listening on port' , app.config.port);
};
