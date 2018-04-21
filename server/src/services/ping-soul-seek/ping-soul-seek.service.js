// Initializes the `pingSoulSeek` service on path `/ping-soul-seek`
const createService = require('./ping-soul-seek.class.js');
const hooks = require('./ping-soul-seek.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    name: 'ping-soul-seek',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/ping-soul-seek', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('ping-soul-seek');

  service.hooks(hooks);
};
