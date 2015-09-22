'use strict';

var fs = require('fs');
var path = require('path');
var apiRoutesPath = path.join(__dirname, '../api/routes');

module.exports = function (app, config) {
  var routes = fs.readdirSync(apiRoutesPath);
  var logs = app.core.logs;

  routes.forEach((route) => {
    var routerPath = path.join(apiRoutesPath, route);
    var router = require(routerPath);

    router(app);
    logs.info('initialized route(' + route + ')');
  });
};
