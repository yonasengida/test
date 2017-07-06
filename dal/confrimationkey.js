// Access Layer for Confrimationkey Data.

// NOTES:
// .population() specifies the references that you want
// mongodb to fill in with the corresponding document
// instead of returning an id.

/**
 * Load Module Dependencies.
 */
var debug   = require('debug')('api:dal-Confrimationkey');
var moment  = require('moment');

var Confrimationkey        = require('../models/confrimationkey');

var population = [
//     {
//   path: 'user'
// }
];
/**
 * create a new Confrimationkey.
 *
 * @desc  creates a new Confrimationkey and saves them
 *        in the database
 *
 * @param {Object}  ConfrimationkeyData  Data for the Confrimationkey to create
 * @param {Function} cb       Callback for once saving is complete
 */
exports.create = function create(confrimationkeyData, cb) {
  debug('creating a new Confrimationkey');

  // Create Confrimationkey
  var confrimationkeyModel  = new Confrimationkey(confrimationkeyData);

  confrimationkeyModel.save(function saveConfrimationkey(err, data) {
    if (err) {
      return cb(err);
    }


    exports.get({ _id: data._id }, function (err, confrimationkey) {
      if(err) {
        return cb(err);
      }

      cb(null, confrimationkey);

    });

  });

};

/**
 * delete a Confrimationkey
 *
 * @desc  delete data of the Confrimationkey with the given
 *        id
 *
 * @param {Object}  query   Query Object
 * @param {Function} cb Callback for once delete is complete
 */
exports.delete = function deleteItem(query, cb) {
  debug('deleting Confrimationkey: ');

  Confrimationkey
    .findOne(query, returnFields)
    .populate(population)
    .exec(function deleteConfrimationkey(err, Confrimationkey) {
      if (err) {
        return cb(err);
      }

      if(!Confrimationkey) {
        return cb(null, {});
      }

      Confrimationkey.remove(function(err) {
        if(err) {
          return cb(err);
        }

        cb(null, Confrimationkey);

      });

    });
};

/**
 * update a Confrimationkey
 *
 * @desc  update data of the Confrimationkey with the given
 *        id
 *
 * @param {Object} query Query object
 * @param {Object} updates  Update data
 * @param {Function} cb Callback for once update is complete
 */
exports.update = function update(query, updates, cb) {
  debug('updating Confrimationkey: ');

  var now = moment().toISOString();

  updates.last_modified = now;

  Confrimationkey
    .findOneAndUpdate(query, updates)
    .populate(population)
    .exec(function updateConfrimationkey(err, Confrimationkey) {
      if(err) {
        return cb(err);
      }

      cb(null, Confrimationkey || {});
    });
};

/**
 * get a Confrimationkey.
 *
 * @desc get a Confrimationkey with the given id from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.get = function get(query, cb) {
  debug('getting Confrimationkey ');

  Confrimationkey
    .findOne(query)
    .populate(population)
    .exec(function(err, Confrimationkey) {
      if(err) {
        return cb(err);
      }

      cb(null, Confrimationkey || {});
    });
};

/**
 * get a collection of Confrimationkeys
 *
 * @desc get a collection of Confrimationkeys from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = function getCollection(query, cb) {
  debug('fetching a collection of Confrimationkeys');

  Confrimationkey.find(query)
    .populate(population)
    .exec(function getConfrimationkeysCollection(err, Confrimationkeys) {
      if(err) {
        return cb(err);
      }
      
      return cb(null, Confrimationkeys);
  });

};

exports.getCollectionBYPagination = function getCollectionBYPagination(query,queryOpts, cb) {

  Confrimationkey.paginate(query, queryOpts, function (err, result) {
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

  