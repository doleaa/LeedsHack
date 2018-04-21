// Initializes the `ping` service on path `/ping`
const createService = require('./ping.class.js');
const hooks = require('./ping.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    name: 'ping',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/ping', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('ping');

  service.hooks(hooks);
};
