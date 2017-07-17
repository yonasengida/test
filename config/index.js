'use strict';
// Load Module Dependencies
// const mongoose = require('mongoose');
// mongoose.plugin(require('mongoose-hidden')({
//   defaultHidden: { _id: false, password: true, '_v': true }
// }));

var HTTP_PORT  = process.env.PORT || 5000;

module.exports = {
  // HTTP PORT
  HTTP_PORT: HTTP_PORT,

  // MONGODB URL
//MONGODB_URL: 'mongodb://localhost/eagles',
MONGODB_URL: 'mongodb://eagle:eagle@ds133162.mlab.com:33162/eagle', 
  // SALT VALUE LENGTH
  SALT_LENGTH :7,
  
 TOKEN_LENGTH: 7,
 CORS_OPTS: {
    origin: '*',
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization'
  },

};
