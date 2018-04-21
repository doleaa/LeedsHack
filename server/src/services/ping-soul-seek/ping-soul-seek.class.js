const slsk = require('slsk-client')

/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    return new Promise((resolve, reject) => {
      slsk.connect({
        user:"troliator96",
        pass:"troliator96"
      }, (error, response) => {
        let client
        if (!error) {
          client = response
          client.search({
            req: 'bicep'
          }, (clientSearchError,clientSearchRespone) => {
            if (!clientSearchError) {
              console.dir(clientSearchRespone)
              client.download({
                file: clientSearchRespone[0],
                path: "/Users/alex/TUOM/leedsHack/LeedsHack/server" + '/random.mp3'
              }, (clientDownloadError, data) => {
                if(!clientDownloadError) {
                  resolve(data.buffer)
                }
              })
            }
          })
        }
      })
    })
  }

  async get (id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create (data, params) {
    if (Array.isArray(data)) {
      return await Promise.all(data.map(current => this.create(current)));
    }

    return data;
  }

  async update (id, data, params) {
    return data;
  }

  async patch (id, data, params) {
    return data;
  }

  async remove (id, params) {
    return { id };
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
