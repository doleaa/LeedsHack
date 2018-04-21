// Initializes the `download` service on path `/download`
const createService = require('./download.class.js');
const hooks = require('./download.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    name: 'download',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/download', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('download');

  service.hooks(hooks);
};
