const slsk = require('slsk-client')
const streamToBuffer = require('stream-to-buffer')
const toArray = require('stream-to-array')

/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    return new Promise((resolve, reject) => {
      if (!(params.query.usr && params.query.pwd && params.query.bitrate 
        && params.query.file && params.query.size && params.query.slots 
        && params.query.speed && params.query.user)) {
        reject(new Error())
      }
  
      const user = params.query.usr
      const pass = params.query.pwd
      let songObj = {}
      songObj.bitrate = params.query.bitrate
      songObj.file = encodeURIComponent(params.query.file)
      songObj.size = params.query.size
      songObj.slots = params.query.slots
      songObj.speed = params.query.speed
      songObj.user = params.query.user

      slsk.connect({
        user,
        pass
      }, (error, response) => {
        if (error) {
          reject(new Error())
        } else {
          const client = response

          client.search({
            req: "avicii",
            timeout: 2000
          }, (err, response) => {
            response = [songObj]
            client.download({
              file: response[0]
            }, (dowloadError, data) => {
              if (dowloadError) {
                reject(new Error())
              } else {
                resolve(data.buffer)
              }
            })
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
