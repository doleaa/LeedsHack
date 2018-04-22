const pingSoulSeek = require('./ping-soul-seek/ping-soul-seek.service.js');
const ping = require('./ping/ping.service.js');
const songs = require('./songs/songs.service.js');
const download = require('./download/download.service.js');
const localDownload = require('./local-download/local-download.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(pingSoulSeek);
  app.configure(ping);
  app.configure(songs);
  app.configure(download);
  app.configure(localDownload);
};
