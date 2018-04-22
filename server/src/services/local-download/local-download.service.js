// Initializes the `local-download` service on path `/local-download`
const createService = require('./local-download.class.js');
const hooks = require('./local-download.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    name: 'local-download',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/local-download', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('local-download');

  service.hooks(hooks);
};
