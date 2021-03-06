// Initializes the `songs` service on path `/songs`
const createService = require('./songs.class.js');
const hooks = require('./songs.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    name: 'songs',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/songs', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('songs');

  service.hooks(hooks);
};
