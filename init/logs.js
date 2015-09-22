'use strict';

var logs = require('winston');
var _ = require('lodash');

module.exports = function (app, config) {
  logs = _.extend(logs, config);
  app.core = {
    logs: logs
  };
};
