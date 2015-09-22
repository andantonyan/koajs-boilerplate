'use strict';

var router = require('koa-route');
var controller = require('../controllers/main');

module.exports = function (app) {
  app.use(router.get('/', controller.main));
};
