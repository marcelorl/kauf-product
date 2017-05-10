const mongoose = require('mongoose');

module.exports = {
  offer: require('./components/offer/controller'),

  connect: () => {
    mongoose.Promise = global.Promise;

    const uri = 'mongodb://localhost/kauf';

    return new Promise((resolve, reject) => {
      mongoose.connection
        .on('error', error => reject(error))
        .on('close', () => console.log('Database connection closed.'))
        .once('open', () => resolve(mongoose.connections[0]));

      mongoose.connect(uri)
    })
  }
};


