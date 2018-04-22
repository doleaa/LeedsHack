const slsk = require('slsk-client')
const request = require('request')

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
            req: "avicii",
            timeout:2000
          }, (clientSearchError,clientSearchRespone) => {
            if (!clientSearchError) {
              clientSearchRespone = clientSearchRespone
                .filter(file => file.size < 4000000 && file.file.endsWith("mp3") && file.slots && file.speed > 0)
              
              if (Array.isArray(clientSearchRespone) && clientSearchRespone.length > 0) {
                console.dir(clientSearchRespone[0])
                let songFile = clientSearchRespone[0]
                songFile.file = encodeURIComponent(songFile.file)
                request.post(
                  {headers: {'content-type' : 'application/json'}, 
                  url:"https://4c9b11b8.ngrok.io/download", 
                  json: songFile
                }, (err, response) => {
                  if (err) {
                    console.dir(err)
                    reject(new Error())
                  }
                  resolve()
                })
              }
              
              // if (Array.isArray(clientSearchRespone) && clientSearchRespone.length > 0) {
              //   client.download({
              //     file: clientSearchRespone[0],
              //     path: "/Users/alex/TUOM/leedsHack/LeedsHack/server" + '/random.mp3'
              //   }, (clientDownloadError, data) => {
              //     if(!clientDownloadError) {
              //       resolve(data.buffer)
              //     }
              //   })
              // }
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
