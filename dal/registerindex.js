// Access Layer for registerindex Data.

// NOTES:
// .population() specifies the references that you want
// mongodb to fill in with the corresponding document
// instead of returning an id.

/**
 * Load Module Dependencies.
 */
var debug   = require('debug')('api:dal-registerindex');
var moment  = require('moment');

var Registerindex        = require('../models/registerindex');

var population = [{
  path: 'profile'
}];
/**
 * create a new registerindex.
 *
 * @desc  creates a new registerindex and saves them
 *        in the database
 *
 * @param {Object}  registerindexData  Data for the registerindex to create
 * @param {Function} cb       Callback for once saving is complete
 */
exports.create = function create(registerindexData, cb) {
  debug('creating a new registerindex');

  // Create registerindex
  var registerindexModel  = new Registerindex(registerindexData);

  registerindexModel.save(function saveregisterindex(err, data) {
    if (err) {
      return cb(err);
    }


    exports.get({ _id: data._id }, function (err, registerindex) {
      if(err) {
        return cb(err);
      }

      cb(null, registerindex);

    });

  });

};

/**
 * delete a registerindex
 *
 * @desc  delete data of the registerindex with the given
 *        id
 *
 * @param {Object}  query   Query Object
 * @param {Function} cb Callback for once delete is complete
 */
exports.delete = function deleteItem(query, cb) {
  debug('deleting registerindex: ');

  Registerindex
    .findOne(query, returnFields)
    .populate(population)
    .exec(function deleteregisterindex(err, registerindex) {
      if (err) {
        return cb(err);
      }

      if(!registerindex) {
        return cb(null, {});
      }

      Registerindex.remove(function(err) {
        if(err) {
          return cb(err);
        }

        cb(null, registerindex);

      });

    });
};

/**
 * update a registerindex
 *
 * @desc  update data of the registerindex with the given
 *        id
 *
 * @param {Object} query Query object
 * @param {Object} updates  Update data
 * @param {Function} cb Callback for once update is complete
 */
exports.update = function update(query, updates, cb) {
  debug('updating registerindex: ');

  var now = moment().toISOString();

  updates.last_modified = now;

  Registerindex
    .findOneAndUpdate(query, updates)
    .populate(population)
    .exec(function updateregisterindex(err, registerindex) {
      if(err) {
        return cb(err);
      }

      cb(null, registerindex || {});
    });
};

/**
 * get a registerindex.
 *
 * @desc get a registerindex with the given id from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.get = function get(query, cb) {
  debug('getting registerindex ');

  Registerindex
    .findOne(query)
    .populate(population)
    .exec(function(err, registerindex) {
      if(err) {
        return cb(err);
      }

      cb(null, registerindex || {});
    });
};

/**
 * get a collection of registerindexs
 *
 * @desc get a collection of registerindexs from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = function getCollection(query, cb) {
  debug('fetching a collection of registerindexs');

  Registerindex.find(query)
    .populate(population)
    .exec(function getregisterindexsCollection(err, registerindexs) {
      if(err) {
        return cb(err);
      }
      
      return cb(null, registerindexs);
  });

};

exports.getCollectionBYPagination = function getCollectionBYPagination(query,queryOpts, cb) {

  Registerindex.paginate(query, queryOpts, function (err, result) {
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

  