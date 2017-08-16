// Access Layer for keyword Data.

// NOTES:
// .population() specifies the references that you want
// mongodb to fill in with the corresponding document
// instead of returning an id.

/**
 * Load Module Dependencies.
 */
var debug   = require('debug')('api:dal-keyword');
var moment  = require('moment');

var Keyword        = require('../models/keyword');

var population = [{
  path: 'profile'
}];
/**
 * create a new keyword.
 *
 * @desc  creates a new keyword and saves them
 *        in the database
 *
 * @param {Object}  keywordData  Data for the keyword to create
 * @param {Function} cb       Callback for once saving is complete
 */
exports.create = function create(keywordData, cb) {
  debug('creating a new keyword');

  // Create keyword
  var keywordModel  = new Keyword(keywordData);

  keywordModel.save(function savekeyword(err, data) {
    if (err) {
      return cb(err);
    }


    exports.get({ _id: data._id }, function (err, keyword) {
      if(err) {
        return cb(err);
      }

      cb(null, keyword);

    });

  });

};

/**
 * delete a keyword
 *
 * @desc  delete data of the keyword with the given
 *        id
 *
 * @param {Object}  query   Query Object
 * @param {Function} cb Callback for once delete is complete
 */
exports.delete = function deleteItem(query, cb) {
  debug('deleting keyword: ');

  Keyword
    .findOne(query, returnFields)
    .populate(population)
    .exec(function deletekeyword(err, keyword) {
      if (err) {
        return cb(err);
      }

      if(!keyword) {
        return cb(null, {});
      }

      Keyword.remove(function(err) {
        if(err) {
          return cb(err);
        }

        cb(null, keyword);

      });

    });
};

/**
 * update a keyword
 *
 * @desc  update data of the keyword with the given
 *        id
 *
 * @param {Object} query Query object
 * @param {Object} updates  Update data
 * @param {Function} cb Callback for once update is complete
 */
exports.update = function update(query, updates, cb) {
  debug('updating keyword: ');

  var now = moment().toISOString();

  updates.last_modified = now;

  Keyword
    .findOneAndUpdate(query, updates)
    .populate(population)
    .exec(function updatekeyword(err, keyword) {
      if(err) {
        return cb(err);
      }

      cb(null, keyword || {});
    });
};

/**
 * get a keyword.
 *
 * @desc get a keyword with the given id from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.get = function get(query, cb) {
  debug('getting keyword ');

  Keyword
    .findOne(query)
    .populate(population)
    .exec(function(err, keyword) {
      if(err) {
        return cb(err);
      }

      cb(null, keyword || {});
    });
};

/**
 * get a collection of keywords
 *
 * @desc get a collection of keywords from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = function getCollection(query, cb) {
  debug('fetching a collection of keywords');

  Keyword.find(query)
    .populate(population)
    .exec(function getkeywordsCollection(err, keywords) {
      if(err) {
        return cb(err);
      }
      
      return cb(null, keywords);
  });

};

exports.getCollectionBYPagination = function getCollectionBYPagination(query,queryOpts, cb) {

  Keyword.paginate(query, queryOpts, function (err, result) {
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

  