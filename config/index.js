'use strict';
// Load Module Dependencies
// const mongoose = require('mongoose');
// mongoose.plugin(require('mongoose-hidden')({
//   defaultHidden: { _id: false, password: true, '_v': true }
// }));

var HTTP_PORT  = process.env.HTTP_PORT || 9090;

module.exports = {
  // HTTP PORT
  HTTP_PORT: HTTP_PORT,

  // MONGODB URL
  MONGODB_URL: 'mongodb://localhost/eagles',
    
  // SALT VALUE LENGTH
  SALT_LENGTH :7,
  
 TOKEN_LENGTH: 7


};
