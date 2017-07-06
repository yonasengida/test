// Access Layer for Log Data.

// NOTES:
// .population() specifies the references that you want
// mongodb to fill in with the corresponding document
// instead of returning an id.

/**
 * Load Module Dependencies.
 */
var debug   = require('debug')('api:dal-Log');
var moment  = require('moment');

var Log        = require('../models/Log');

var population = [{
  path: 'user'
}];
/**
 * create a new Log.
 *
 * @desc  creates a new Log and saves them
 *        in the database
 *
 * @param {Object}  LogData  Data for the Log to create
 * @param {Function} cb       Callback for once saving is complete
 */
exports.create = function create(LogData, cb) {
  debug('creating a new Log');

  // Create Log
  var LogModel  = new Log(LogData);

  LogModel.save(function saveLog(err, data) {
    if (err) {
      return cb(err);
    }


  });

};

/**
 * get a Log.
 *
 * @desc get a Log with the given id from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.get = function get(query, cb) {
  debug('getting Log ');

  Log
    .findOne(query)
    .populate(population)
    .exec(function(err, Log) {
      if(err) {
        return cb(err);
      }

      cb(null, Log || {});
    });
};

/**
 * get a collection of Logs
 *
 * @desc get a collection of Logs from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = function getCollection(query, cb) {
  debug('fetching a collection of Logs');

  Log.find(query)
    .populate(population)
    .exec(function getLogsCollection(err, Logs) {
      if(err) {
        return cb(err);
      }
      
      return cb(null, Logs);
  });

};

exports.getCollectionBYPagination = function getCollectionBYPagination(query,queryOpts, cb) {

  Log.paginate(query, queryOpts, function (err, result) {
    // result.docs
    // result.total
    // result.limit - 10
    // result.page - 3
    // result.pages

    if (err) {
      return cb(err);
    }
    return cb(null, result);
  });
};

  