const NeDB = require('nedb');
const path = require('path');

module.exports = function (app) {
  const dbPath = app.get('nedb');
  const Model = new NeDB({
    filename: path.join(dbPath, 'aromas.db'),
    timestampData: true,
    autoload: true
  });


  // eslint-disable-next-line no-unused-vars
  Model.ensureIndex({ fieldName: 'name', unique: true }, function(err) {
    // handle errors...
    // err.errorType, err.key, err.message
    if (err) {
      console.log("aromas.model ensureIndex error", err);
    }
  });

  return Model;
};

