const slsk = require('slsk-client')

/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    console.dir(params.query)
    return new Promise ((resolve, reject) => {
      const user = params.query.usr ? params.query.usr : ""
      const pass = params.query.pwd ? params.query.pwd : ""
      slsk.connect({
        user,
        pass
      }, (error, response) => {
        if (!error) {
          resolve("OK")
        } else {
          reject(new Error())
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
