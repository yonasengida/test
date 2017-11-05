// Load Module Dependencies
var xtend    = require('xtend');
var unless   = require('express-unless');

var TokenDal = require('../dal/token');
// var UserDal      = require('../dal/user');

module.exports = function authenticate(opts) {

  var defaults = {
    open_endpoints: [],
    set_auth: true
  };

  defaults = xtend(defaults, opts);

  var middleware = function middleware(req, res, next) {
    if (!defaults.set_auth) {
      next();

    } else {
      var auth = req.get('Authorization');

      if (!auth) {
        res.status(403);
        res.json({
          error: true,
          message: 'Please set Authorization Key'
        });

        return;
      } else {

        var tokens = auth.trim().split(/\s+/);

        if (tokens[0] !== 'Bearer') {

          res.status(403);
          res.json({
            error: true,
            message: 'Authentication Realm should be Bearer'
          });

          return;

        }
        // Retrieve API Key
        TokenDal.get({ value: tokens[1] }, function callback(err, token) {
          // Pass any err to the Error Handler
          if (err) {
            return next(err);
          }
          // If key not found === Key is not recognized
          if (!token._id) {
            res.status(403);
            res.json({
              error: true,
              message: 'Authentication Token Is Not Recognized!'
            });

            return;
          } else {
            //console.log(token);
            req._user = token.user;

          // console.log("to check" + req._user);

            next();
          }
        });


      }

    }

  };

  middleware.unless = unless;

  return middleware;
};
