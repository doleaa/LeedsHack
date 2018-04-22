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
    return new Promise((resolve, reject) => {
      if (!(params.query.usr && params.query.pwd)) {
        reject(new Error())
      }
  
      const songSearchString = id
      const user = params.query.usr ? params.query.usr : ""
      const pass = params.query.pwd ? params.query.pwd : ""
      
      slsk.connect({
        user,
        pass
      }, (error, response) => {
        if (error) {
          reject(new Error())
        } else {
          let client = response

          client.search({
            req: songSearchString,
            timeout: 4000
          }, (clientSearchError, clientSearchResponse) => {
            clientSearchResponse = clientSearchResponse.filter(file => file.size < 15000000 && file.file.endsWith("mp3") && file.slots && file.speed > 0)
            if (clientSearchError) {
              reject(new Error())
            } else {
              resolve(clientSearchResponse)
            }
          })
        }
      })
    })
    
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
