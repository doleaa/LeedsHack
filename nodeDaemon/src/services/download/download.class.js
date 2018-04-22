const slsk = require('slsk-client')

/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    return [];
  }

  async get (id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create (data, params) {
    return new Promise((resolve, reject) => {
      if (!(params.query.usr && params.query.pwd)) {
        reject(new Error())
      }

      const user = params.query.usr
      const pass = params.query.pwd
      const songObj = data

      slsk.connect({
        user,
        pass
      }, (error, response) => {
        if (error) {
          reject(new Error())
        } else {
          const client = response
          client.download({
            file: songObj,
            path: "/tmp/nuseekSongs" + '/' + songObj.file +'.mp3'
          }, (dowloadError, data) => {

            if (dowloadError) {
              console.dir(dowloadError)
              reject(new Error())
            } else {
              resolve()
            }
          })
        }
      })
    })
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
