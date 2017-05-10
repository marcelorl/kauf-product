const mongoose = require('mongoose');

const connectDatabase = () => {
  mongoose.Promise = global.Promise;

  const uri = `mongodb://localhost:27017/kauf`;

  return new Promise((resolve, reject) => {
    mongoose.connection
      .on('error', error => reject(error))
      .on('close', () => console.log('Database connection closed.'))
      .once('open', () => resolve(mongoose.connections[0]));

    mongoose.connect(uri);
  });
};

module.exports = connectDatabase;
