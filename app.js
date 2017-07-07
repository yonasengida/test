// Load Module Dependencies
var express     = require('express');
var bodyParser  = require('body-parser');
var debug       = require('debug')('eagles-api');
var mongoose    = require('mongoose');
var validator   = require('express-validator');
var search      = require('express-partial-response');
var config      = require('./config');
var router      = require('./routes');
var authenticate = require('./lib/authenticate');
//var authorize = require('./lib/authorize');

// Connect to Mongodb
mongoose.connect(config.MONGODB_URL);
// listen to connection event
mongoose.connection.on('connected', function mongodbConnectionListener() {
  debug('EAGLES-Mongodb Connected successfully');
   console.log("EAGLES-Mongodb Connected successfully!")
});
// handle error eventy
mongoose.connection.on('error', function mongodbErrorListener() {
  debug('Connection to Mongodb Failed!!');
  console.log("Connection to Mongodb Failed!!")
  // Try and Reconnect
  mongoose.connect(config.MONGODB_URL);
 // mongoose.connect(config.MONGODB_UR, { useMongoClient: true, /* other options */ })

});

// Initialize app
var app = express();
app.use(express.static('docs'))

// //Authentication Middleware
app.use(authenticate({set_auth:true}).unless({
  path: ['/users/login', '/users/signup','/vacancies/open','/comments','/news','/key']
}));

// Set Middleware
app.use(bodyParser.json());

// This is Middleware is used to filter and search
app.use(search());

// Set Validator
app.use(validator());

//CORS -enable cross-origin resource sharing
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Set Routes
router(app);

//Not Found Handler
app.use(function notFoundHandler(req, res, next) {

  res.status(404).json({
    error: true,
    msg: "Not Found",
    status: 404
  });
});

// Error Handling Middleware
app.use(function errorHandler(err, req, res, next) {
  if(err.name === 'CastError') {
    err.STATUS = 400;
  }
  res.status(err.STATUS || 500);
  res.json({
    error: true,
    message: err.message,
    type: err.name,
    status: err.STATUS || 500
  });
});

// Listen to HTTP Port
app.listen(config.HTTP_PORT, function connectionListener() {
  console.log("App is running");
  debug('EAGLES API running on port %s', config.HTTP_PORT);
});

module.exports = app;