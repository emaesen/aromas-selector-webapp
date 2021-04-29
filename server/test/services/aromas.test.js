const assert = require('assert');
const app = require('../../src/app');

describe('\'aromas\' service', () => {
  it('registered the service', () => {
    const service = app.service('aromas');

    assert.ok(service, 'Registered the service');
  });
});
