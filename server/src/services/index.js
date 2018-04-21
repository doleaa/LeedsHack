const pingSoulSeek = require('./ping-soul-seek/ping-soul-seek.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(pingSoulSeek);
};
