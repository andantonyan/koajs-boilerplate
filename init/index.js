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
    var fn = name.split(':');
    var initFunction = require(path.join(INIT_PATH, fn[0]));

    fn.length > 1 ? initFunction[fn[1]](app, config[fn[0]][fn[1]]) : initFunction(app, config[fn[0]]);
    logs.info('initialized', name);
  });

  app.config = config;

  app.listen(app.config.port);
  logs.info('listening on port' , app.config.port);
};
