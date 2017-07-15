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

var Level1Confrimationkey        = require('../models/level1confrimationkey');

var population = [
//     {
//   path: 'user'
// }
];
/**
 * create a new Level1Confrimationkey.
 *
 * @desc  creates a new Level1Confrimationkey and saves them
 *        in the database
 *
 * @param {Object}  Level1ConfrimationkeyData  Data for the Level1Confrimationkey to create
 * @param {Function} cb       Callback for once saving is complete
 */
exports.create = function create(level1ConfrimationkeyData, cb) {
  debug('creating a new Level1Confrimationkey');

  // Create Level1Confrimationkey
  var Level1ConfrimationkeyModel  = new Level1Confrimationkey(level1ConfrimationkeyData);

  Level1ConfrimationkeyModel.save(function saveLevel1Confrimationkey(err, data) {
    if (err) {
      return cb(err);
    }


    exports.get({ _id: data._id }, function (err, level1Confrimationkey) {
      if(err) {
        return cb(err);
      }

      cb(null, level1Confrimationkey);

    });

  });

};

/**
 * delete a Level1Confrimationkey
 *
 * @desc  delete data of the Level1Confrimationkey with the given
 *        id
 *
 * @param {Object}  query   Query Object
 * @param {Function} cb Callback for once delete is complete
 */
exports.delete = function deleteItem(query, cb) {
  debug('deleting Level1Confrimationkey: ');

  Level1Confrimationkey
    .findOne(query, returnFields)
    .populate(population)
    .exec(function deleteLevel1Confrimationkey(err, doc) {
      if (err) {
        return cb(err);
      }

      if(!doc) {
        return cb(null, {});
      }

      Level1Confrimationkey.remove(function(err) {
        if(err) {
          return cb(err);
        }

        cb(null, doc);

      });

    });
};

/**
 * update a Level1Confrimationkey
 *
 * @desc  update data of the Level1Confrimationkey with the given
 *        id
 *
 * @param {Object} query Query object
 * @param {Object} updates  Update data
 * @param {Function} cb Callback for once update is complete
 */
exports.update = function update(query, updates, cb) {
  debug('updating Level1Confrimationkey: ');

  var now = moment().toISOString();

  updates.last_modified = now;

  Level1Confrimationkey
    .findOneAndUpdate(query, updates)
    .populate(population)
    .exec(function updateLevel1Confrimationkey(err, doc) {
      if(err) {
        return cb(err);
      }

      cb(null, doc || {});
    });
};

/**
 * get a Level1Confrimationkey.
 *
 * @desc get a Level1Confrimationkey with the given id from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.get = function get(query, cb) {
  debug('getting Level1Confrimationkey ');

  Level1Confrimationkey
    .findOne(query)
    .populate(population)
    .exec(function(err, doc) {
      if(err) {
        return cb(err);
      }

      cb(null, doc || {});
    });
};

/**
 * get a collection of Level1Confrimationkeys
 *
 * @desc get a collection of Level1Confrimationkeys from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = function getCollection(query, cb) {
  debug('fetching a collection of Level1Confrimationkeys');

  Level1Confrimationkey.find(query)
    .populate(population)
    .exec(function getLevel1ConfrimationkeysCollection(err, doc) {
      if(err) {
        return cb(err);
      }
      
      return cb(null, doc);
  });

};

exports.getCollectionBYPagination = function getCollectionBYPagination(query,queryOpts, cb) {

  Level1Confrimationkey.paginate(query, queryOpts, function (err, result) {
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

  