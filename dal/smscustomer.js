// Access Layer for smscustomer Data.

// NOTES:
// .population() specifies the references that you want
// mongodb to fill in with the corresponding document
// instead of returning an id.

/**
 * Load Module Dependencies.
 */
var debug   = require('debug')('api:dal-smscustomer');
var moment  = require('moment');

var Smscustomer        = require('../models/smscustomer');

var population = [{
  path: 'profile'
}];
/**
 * create a new smscustomer.
 *
 * @desc  creates a new smscustomer and saves them
 *        in the database
 *
 * @param {Object}  smscustomerData  Data for the smscustomer to create
 * @param {Function} cb       Callback for once saving is complete
 */
exports.create = function create(smscustomerData, cb) {
  debug('creating a new smscustomer');

  // Create smscustomer
  var smscustomerModel  = new Smscustomer(smscustomerData);

  smscustomerModel.save(function savesmscustomer(err, data) {
    if (err) {
      return cb(err);
    }


    exports.get({ _id: data._id }, function (err, smscustomer) {
      if(err) {
        return cb(err);
      }

      cb(null, smscustomer);

    });

  });

};

/**
 * delete a smscustomer
 *
 * @desc  delete data of the smscustomer with the given
 *        id
 *
 * @param {Object}  query   Query Object
 * @param {Function} cb Callback for once delete is complete
 */
exports.delete = function deleteItem(query, cb) {
  debug('deleting smscustomer: ');

  Smscustomer
    .findOne(query, returnFields)
    .populate(population)
    .exec(function deletesmscustomer(err, smscustomer) {
      if (err) {
        return cb(err);
      }

      if(!smscustomer) {
        return cb(null, {});
      }

      Smscustomer.remove(function(err) {
        if(err) {
          return cb(err);
        }

        cb(null, smscustomer);

      });

    });
};

/**
 * update a smscustomer
 *
 * @desc  update data of the smscustomer with the given
 *        id
 *
 * @param {Object} query Query object
 * @param {Object} updates  Update data
 * @param {Function} cb Callback for once update is complete
 */
exports.update = function update(query, updates, cb) {
  debug('updating smscustomer: ');

  var now = moment().toISOString();

  updates.last_modified = now;

  Smscustomer
    .findOneAndUpdate(query, updates)
    .populate(population)
    .exec(function updatesmscustomer(err, smscustomer) {
      if(err) {
        return cb(err);
      }

      cb(null, smscustomer || {});
    });
};

/**
 * get a smscustomer.
 *
 * @desc get a smscustomer with the given id from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.get = function get(query, cb) {
  debug('getting smscustomer ');

  Smscustomer
    .findOne(query)
    .populate(population)
    .exec(function(err, smscustomer) {
      if(err) {
        return cb(err);
      }

      cb(null, smscustomer || {});
    });
};

/**
 * get a collection of smscustomers
 *
 * @desc get a collection of smscustomers from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = function getCollection(query, cb) {
  debug('fetching a collection of smscustomers');

  Smscustomer.find(query)
    .populate(population)
    .exec(function getsmscustomersCollection(err, smscustomers) {
      if(err) {
        return cb(err);
      }
      
      return cb(null, smscustomers);
  });

};

exports.getCollectionBYPagination = function getCollectionBYPagination(query,queryOpts, cb) {

  Smscustomer.paginate(query, queryOpts, function (err, result) {
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

  