const aromas = require('./aromas/aromas.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(aromas);
};
