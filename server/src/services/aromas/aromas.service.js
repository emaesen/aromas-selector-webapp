// Initializes the `aromas` service on path `/aromas`
const { Aromas } = require('./aromas.class');
const createModel = require('../../models/aromas.model');
const hooks = require('./aromas.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: {
      default: 200,
      max: 300
    }
  };

  // Initialize our service with any options it requires
  app.use('/aromas', new Aromas(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('aromas');

  service.hooks(hooks);
};
