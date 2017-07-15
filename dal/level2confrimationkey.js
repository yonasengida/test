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

var Level2Confrimationkey        = require('../models/level2confrimationkey');

var population = [
//     {
//   path: 'user'
// }
];
/**
 * create a new Level2Confrimationkey.
 *
 * @desc  creates a new Level2Confrimationkey and saves them
 *        in the database
 *
 * @param {Object}  Level2ConfrimationkeyData  Data for the Level2Confrimationkey to create
 * @param {Function} cb       Callback for once saving is complete
 */
exports.create = function create(level2ConfrimationkeyData, cb) {
  debug('creating a new Level2Confrimationkey');

  // Create Level2Confrimationkey
  var Level2ConfrimationkeyModel  = new Level2Confrimationkey(level2ConfrimationkeyData);

  Level2ConfrimationkeyModel.save(function saveLevel2Confrimationkey(err, data) {
    if (err) {
      return cb(err);
    }


    exports.get({ _id: data._id }, function (err, level2Confrimationkey) {
      if(err) {
        return cb(err);
      }

      cb(null, level2Confrimationkey);

    });

  });

};

/**
 * delete a Level2Confrimationkey
 *
 * @desc  delete data of the Level2Confrimationkey with the given
 *        id
 *
 * @param {Object}  query   Query Object
 * @param {Function} cb Callback for once delete is complete
 */
exports.delete = function deleteItem(query, cb) {
  debug('deleting Level2Confrimationkey: ');

  Level2Confrimationkey
    .findOne(query, returnFields)
    .populate(population)
    .exec(function deleteLevel2Confrimationkey(err, doc) {
      if (err) {
        return cb(err);
      }

      if(!doc) {
        return cb(null, {});
      }

      Level2Confrimationkey.remove(function(err) {
        if(err) {
          return cb(err);
        }

        cb(null, doc);

      });

    });
};

/**
 * update a Level2Confrimationkey
 *
 * @desc  update data of the Level2Confrimationkey with the given
 *        id
 *
 * @param {Object} query Query object
 * @param {Object} updates  Update data
 * @param {Function} cb Callback for once update is complete
 */
exports.update = function update(query, updates, cb) {
  debug('updating Level2Confrimationkey: ');

  var now = moment().toISOString();

  updates.last_modified = now;

  Level2Confrimationkey
    .findOneAndUpdate(query, updates)
    .populate(population)
    .exec(function updateLevel2Confrimationkey(err, doc) {
      if(err) {
        return cb(err);
      }

      cb(null, doc || {});
    });
};

/**
 * get a Level2Confrimationkey.
 *
 * @desc get a Level2Confrimationkey with the given id from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.get = function get(query, cb) {
  debug('getting Level2Confrimationkey ');

  Level2Confrimationkey
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
 * get a collection of Level2Confrimationkeys
 *
 * @desc get a collection of Level2Confrimationkeys from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = function getCollection(query, cb) {
  debug('fetching a collection of Level2Confrimationkeys');

  Level2Confrimationkey.find(query)
    .populate(population)
    .exec(function getLevel2ConfrimationkeysCollection(err, doc) {
      if(err) {
        return cb(err);
      }
      
      return cb(null, doc);
  });

};

exports.getCollectionBYPagination = function getCollectionBYPagination(query,queryOpts, cb) {

  Level2Confrimationkey.paginate(query, queryOpts, function (err, result) {
    // result.docs
    // result.total
    // result.limit - 20
    // result.page - 3
    // result.pages

    if (err) {
      return cb(err);
    }
    return cb(null, result);
  });
};

  