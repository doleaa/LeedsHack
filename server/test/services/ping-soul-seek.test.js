const assert = require('assert');
const app = require('../../src/app');

describe('\'pingSoulSeek\' service', () => {
  it('registered the service', () => {
    const service = app.service('ping-soul-seek');

    assert.ok(service, 'Registered the service');
  });
});
