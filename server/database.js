const mongoose = require('mongoose');

const connectionString = process.env.MONGODB_URI;

module.exports = function () {
  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,   
  })
    .then(() => {
      console.log('Mongo Connection Open!');
    })
    .catch((err) => {
      console.log('Mongo Connection Error!', err);
    });
};