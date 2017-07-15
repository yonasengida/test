// Load Module Dependencies
var events     = require('events');
var crypto     = require('crypto');

var debug      = require('debug')('eagles-api');
var moment     = require('moment');
var config     = require('../config');
var UserDal    = require('../dal/user');
var TokenDal   = require('../dal/token');
var ProfileDal   = require('../dal/profile');

//Login Controller
exports.login = function login(req, res, next) {
    debug('Login User');
    var workflow = new events.EventEmitter();

    workflow.on('validateData', function validateData() {
        req.checkBody('user_name', 'username is invalid')
            .notEmpty();
        req.checkBody('password', 'password is invalid')
            .notEmpty();
        var errs = req.validationErrors();
        if (errs) {
            res.status(400);
            res.json(errs);
            return;
        }
        workflow.emit('validateUsername');
    });

    workflow.on('validateUsername', function validateUsername() {
        UserDal.get({user_name: req.body.user_name }, function done(err, user) {
          //  console.log(user);
            if (!user._id) {

                res.status(404);
                res.json({
                    message: "User Not Found!",
                });
                return;
            }
            workflow.emit('validateUserpassword', user);
        });
    });
    workflow.on('validateUserpassword', function validateUserpassword(user) {
        // Check password
        user.checkPassword(req.body.password, function done(err, isOk) {
            if (err) {
                return next(err);
            }
            if (!isOk) {
                res.status(403);
                res.json({
                    message: "wrong credentials"
                })
                return;
            }
            workflow.emit('generateToken', user);
        });

    });

    workflow.on('generateToken', function generateToken(user) {
        TokenDal.get({ user: user._id }, function done(err, token) {
            if (err) {
                return next(err);
            }
            crypto.randomBytes(config.TOKEN_LENGTH, function tokenGenerator(err, buff) {
                if (err) {
                    return next(err);
                }
                var tokenValue = buff.toString('base64');
                // Generate a new token
                if (!token._id) {
                    TokenDal.create({ user: user._id, value: tokenValue, revoked: false }, function createToken(err, token) {
                        if (err) {
                            return next(err);
                        }
                        workflow.emit('respond', user, tokenValue);
                    });
                } else {
                    // Update Value
                    TokenDal.update({ _id: token._id }, { value: tokenValue, revoked: false }, function updateToken(err, token) {
                        if (err) {
                            return next(err);
                        }
                        workflow.emit('respond', user, tokenValue);
                    });
                }

            });
        });
    });
    workflow.on('respond', function respond(user, tokenValue) {
        var now = moment().toISOString();
        UserDal.update({ _id: user._id }, { last_login: now }, function updateLogin(err, user) {
            if (err) {
                return next(err);
            }
               req._user1 = user.profile.user;
               ProfileDal.get({ user: user._id }, function getProfile(err, doc) {
                if (err) {
                    return next(err);
                }
                 
              //  console.log( req._user)
                res.json({
                    token: tokenValue,
                    user: doc

                });
            //console.log(sizeof(doc.customer.job_category));
               // console.log(.customerreq._user1);
            });


        });
    });

    workflow.emit('validateData');

};


//Logout Controller
exports.logout = function logout(req, res, next) {
   // console.log(req._user1);
    // TokenDal.update({ user: token._id }, {revoked: true }, function updateToken(err, token) {
    //     if (err) {
    //         return next(err);
    //     }
    //     res.json({
    //         msg:"Sucess Fully Logout"
    //     });
    // });
    // fetch the user id from req object, which is appended on the authenticate middleware
    var userId = req._user1;
    console.log(userId)
    if (!userId) {
        // respond error to the request
        res.status(401);    // Unauthorized
        res.json({
            message: 'You need to be logged in to logout!, Use a correct token'
        });
        return;
    }
    // Revoke the token value of the user
    TokenDal.update({ user: userId }, { $set: { revoked: true } }, function updateCallback(err, token) {
        if (err) return next(err);
        // respond to the user
        res.status(200);    // Ok
        res.json({
            message: 'User Successfuly logged out!'
        })
    });

};

 