var fs = require('fs');
var path = require('path');
var apiModelsPath = path.join(__dirname, '../api/models');
var mongoose = require('mongoose-q')(require('mongoose'));
var _ = require('lodash');

module.exports = {
  mongoDb: function (app, config) {
    var logs = app.core.logs;

    mongoose.connect(config);
    logs.info('initialized mongodb connection');

    var models = fs.readdirSync(apiModelsPath);

    models.forEach((name) => {
      var modelPath = path.join(apiModelsPath, name);
      var model = require(modelPath);

      logs.info('initialized model(' + name + ')');
    });

    app.core.models = {};
    _.forEach(mongoose.models, (value, key) => {
      app.core.models[key.toLowerCase()] = value;
    });
  }
};
