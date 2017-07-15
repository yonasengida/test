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

var Level3Confrimationkey        = require('../models/level3confrimationkey');

var population = [
//     {
//   path: 'user'
// }
];
/**
 * create a new Level3Confrimationkey.
 *
 * @desc  creates a new Level3Confrimationkey and saves them
 *        in the database
 *
 * @param {Object}  Level3ConfrimationkeyData  Data for the Level3Confrimationkey to create
 * @param {Function} cb       Callback for once saving is complete
 */
exports.create = function create(level3ConfrimationkeyData, cb) {
  debug('creating a new Level3Confrimationkey');

  // Create Level3Confrimationkey
  var Level3ConfrimationkeyModel  = new Level3Confrimationkey(level3ConfrimationkeyData);

  Level3ConfrimationkeyModel.save(function saveLevel3Confrimationkey(err, data) {
    if (err) {
      return cb(err);
    }


    exports.get({ _id: data._id }, function (err, level3Confrimationkey) {
      if(err) {
        return cb(err);
      }

      cb(null, level3Confrimationkey);

    });

  });

};

/**
 * delete a Level3Confrimationkey
 *
 * @desc  delete data of the Level3Confrimationkey with the given
 *        id
 *
 * @param {Object}  query   Query Object
 * @param {Function} cb Callback for once delete is complete
 */
exports.delete = function deleteItem(query, cb) {
  debug('deleting Level3Confrimationkey: ');

  Level3Confrimationkey
    .findOne(query, returnFields)
    .populate(population)
    .exec(function deleteLevel3Confrimationkey(err, doc) {
      if (err) {
        return cb(err);
      }

      if(!doc) {
        return cb(null, {});
      }

      Level3Confrimationkey.remove(function(err) {
        if(err) {
          return cb(err);
        }

        cb(null, doc);

      });

    });
};

/**
 * update a Level3Confrimationkey
 *
 * @desc  update data of the Level3Confrimationkey with the given
 *        id
 *
 * @param {Object} query Query object
 * @param {Object} updates  Update data
 * @param {Function} cb Callback for once update is complete
 */
exports.update = function update(query, updates, cb) {
  debug('updating Level3Confrimationkey: ');

  var now = moment().toISOString();

  updates.last_modified = now;

  Level3Confrimationkey
    .findOneAndUpdate(query, updates)
    .populate(population)
    .exec(function updateLevel3Confrimationkey(err, doc) {
      if(err) {
        return cb(err);
      }

      cb(null, doc || {});
    });
};

/**
 * get a Level3Confrimationkey.
 *
 * @desc get a Level3Confrimationkey with the given id from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.get = function get(query, cb) {
  debug('getting Level3Confrimationkey ');

  Level3Confrimationkey
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
 * get a collection of Level3Confrimationkeys
 *
 * @desc get a collection of Level3Confrimationkeys from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = function getCollection(query, cb) {
  debug('fetching a collection of Level3Confrimationkeys');

  Level3Confrimationkey.find(query)
    .populate(population)
    .exec(function getLevel3ConfrimationkeysCollection(err, doc) {
      if(err) {
        return cb(err);
      }
      
      return cb(null, doc);
  });

};

exports.getCollectionBYPagination = function getCollectionBYPagination(query,queryOpts, cb) {

  Level3Confrimationkey.paginate(query, queryOpts, function (err, result) {
    // result.docs
    // result.total
    // result.limit - 30
    // result.page - 3
    // result.pages

    if (err) {
      return cb(err);
    }
    return cb(null, result);
  });
};

  