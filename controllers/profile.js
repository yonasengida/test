// Load Module Dependencies
var debug = require('debug')('afrikik-api');
var moment = require('moment');

var ProfileDal = require('../dal/profile');

// Interface for not implemented
exports.noop = function noop(req, res, next) {
  res.json({
    msg: 'To Implemented!'
  });
};
/**
 * Validate Profile
 */
/**
 * @desc profileID id validation interface
 * @param {id} unique Profile ID
 * @param {req} http request
 * @param {res} Http response
 * @param {next} middlware dispatcher
 */
exports.validateProfile = function validateProfile(req, res, next, id) {
  //Validate the id is mongoid or not
  req.checkParams('id', 'Invalid param').isMongoId(id);

  var validationErrors = req.validationErrors();

  if (validationErrors) {


    res.status(404).json({
      error: true,
      msg: "Not Found",
      status: 404
    });


  } else {
    ProfileDal.get({ _id: id }, function (err, profile) {
      if (profile._id) {
        req.profile = profile._id;
        next();
      } else {
        res.status(404)
          .json({
            error: true, status: 404,
            msg: 'profile _id ' + id + ' not fount'
          });
      }
    });
  }
};
/**
 * Get Profile
 */
exports.getProfile = function getProfile(req, res, next) {

  ProfileDal.get({ _id: req.profile }, function getProfile(err, profile) {
    if (err) {
      return next(err);
    }
    res.json(profile);
  });
};

/**
 * Get Profiles
 */
exports.getProfiles = function getProfiles(req, res, next) {
  debug('fetching all profile information');
  ProfileDal.getCollection({}, function getProfiles(err, profiles) {
    if (err) {
      return next(err);
    }
    res.json(profiles);
  });
};
/**
 * Update Profile
 */
exports.updateProfile = function updateProfile(req, res, next) {
  var body = req.body;
 
  ProfileDal.update({ _id: req.profile }, body, function update(err, profile) {
    if (err) {
      return next(err);
    }

    if (!profile) {
      res.status(404);
      res.json({
        error: true,
        msg: 'Profile To Be Updated Not Found!',
        status: 404
      });
      return;

    } else {

      res.json(profile);

    }
  });
};
//Export By Pagination
exports.getByPagination = function getByPagination(req, res, next) {

 var query ={};
 // retrieve pagination query params
  var page   = req.query.page || 1;
  var limit  = req.query.per_page || 1;
 var queryOpts ={
   page:page,
   limit:limit
  };

  ProfileDal.getCollectionBYPagination(query,queryOpts, function getByPaginationCb(err, doc) {
    if (err) {
      return next(err);
    }
    if (!doc) {
      res.status(404),
        res.json({
          error: true,
          msg: "Requested Data is not found",
          status: 404
        }
        );
    }
    res.json(doc);
  });

};

