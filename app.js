'use strict';

var koa = require('koa');
var app = koa();
var init = require('./init');

init(app);

module.exports = app;
