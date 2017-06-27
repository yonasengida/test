// Access Layer for News Data.

// NOTES:
// .population() specifies the references that you want
// mongodb to fill in with the corresponding document
// instead of returning an id.

/**
 * Load Module Dependencies.
 */
var debug   = require('debug')('api:dal-News');
var moment  = require('moment');

var News        = require('../models/News');

var population = [{
  path: 'user'
}];
/**
 * create a new NMews.
 *
 * @desc  creates a new News and saves them
 *        in the database
 *
 * @param {Object}  NewsData  Data for the News to create
 * @param {Function} cb       Callback for once saving is complete
 */
exports.create = function create(NewsData, cb) {
  debug('creating a new News');

  // Create News
  var NewsModel  = new News(NewsData);

  NewsModel.save(function saveNews(err, data) {
    if (err) {
      return cb(err);
    }


    exports.get({ _id: data._id }, function (err, News) {
      if(err) {
        return cb(err);
      }

      cb(null, News);

    });

  });

};

/**
 * delete a News
 *
 * @desc  delete data of the News with the given
 *        id
 *
 * @param {Object}  query   Query Object
 * @param {Function} cb Callback for once delete is complete
 */
exports.delete = function deleteItem(query, cb) {
  debug('deleting News: ');

  News
    .findOne(query, returnFields)
    .populate(population)
    .exec(function deleteNews(err, News) {
      if (err) {
        return cb(err);
      }

      if(!News) {
        return cb(null, {});
      }

      News.remove(function(err) {
        if(err) {
          return cb(err);
        }

        cb(null, News);

      });

    });
};

/**
 * update a News
 *
 * @desc  update data of the News with the given
 *        id
 *
 * @param {Object} query Query object
 * @param {Object} updates  Update data
 * @param {Function} cb Callback for once update is complete
 */
exports.update = function update(query, updates, cb) {
  debug('updating News: ');

  var now = moment().toISOString();

  updates.last_modified = now;

  News
    .findOneAndUpdate(query, updates)
    .populate(population)
    .exec(function updateNews(err, News) {
      if(err) {
        return cb(err);
      }

      cb(null, News || {});
    });
};

/**
 * get a News.
 *
 * @desc get a News with the given id from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.get = function get(query, cb) {
  debug('getting News ');

  News
    .findOne(query)
    .populate(population)
    .exec(function(err, News) {
      if(err) {
        return cb(err);
      }

      cb(null, News || {});
    });
};

/**
 * get a collection of Newss
 *
 * @desc get a collection of Newss from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = function getCollection(query, cb) {
  debug('fetching a collection of Newss');

  News.find(query)
    .populate(population)
    .exec(function getNewssCollection(err, Newss) {
      if(err) {
        return cb(err);
      }
      
      return cb(null, Newss);
  });

};

exports.getCollectionBYPagination = function getCollectionBYPagination(query,queryOpts, cb) {

  News.paginate(query, queryOpts, function (err, result) {
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

  