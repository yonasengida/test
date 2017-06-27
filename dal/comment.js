// Access Layer for Comment Data.

// NOTES:
// .population() specifies the references that you want
// mongodb to fill in with the corresponding document
// instead of returning an id.

/**
 * Load Module Dependencies.
 */
var debug   = require('debug')('api:dal-Comment');
var moment  = require('moment');

var Comment        = require('../models/comment');

var population = [{
  path: 'user'
}];
/**
 * create a new Comment.
 *
 * @desc  creates a new Comment and saves them
 *        in the database
 *
 * @param {Object}  CommentData  Data for the Comment to create
 * @param {Function} cb       Callback for once saving is complete
 */
exports.create = function create(CommentData, cb) {
  debug('creating a new Comment');

  // Create Comment
  var CommentModel  = new Comment(CommentData);

  CommentModel.save(function saveComment(err, data) {
    if (err) {
      return cb(err);
    }


    exports.get({ _id: data._id }, function (err, Comment) {
      if(err) {
        return cb(err);
      }

      cb(null, Comment);

    });

  });

};

/**
 * delete a Comment
 *
 * @desc  delete data of the Comment with the given
 *        id
 *
 * @param {Object}  query   Query Object
 * @param {Function} cb Callback for once delete is complete
 */
exports.delete = function deleteItem(query, cb) {
  debug('deleting Comment: ');

  Comment
    .findOne(query, returnFields)
    .populate(population)
    .exec(function deleteComment(err, Comment) {
      if (err) {
        return cb(err);
      }

      if(!Comment) {
        return cb(null, {});
      }

      Comment.remove(function(err) {
        if(err) {
          return cb(err);
        }

        cb(null, Comment);

      });

    });
};

/**
 * update a Comment
 *
 * @desc  update data of the Comment with the given
 *        id
 *
 * @param {Object} query Query object
 * @param {Object} updates  Update data
 * @param {Function} cb Callback for once update is complete
 */
exports.update = function update(query, updates, cb) {
  debug('updating Comment: ');

  var now = moment().toISOString();

  updates.last_modified = now;

  Comment
    .findOneAndUpdate(query, updates)
    .populate(population)
    .exec(function updateComment(err, Comment) {
      if(err) {
        return cb(err);
      }

      cb(null, Comment || {});
    });
};

/**
 * get a Comment.
 *
 * @desc get a Comment with the given id from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.get = function get(query, cb) {
  debug('getting Comment ');

  Comment
    .findOne(query)
    .populate(population)
    .exec(function(err, Comment) {
      if(err) {
        return cb(err);
      }

      cb(null, Comment || {});
    });
};

/**
 * get a collection of Comments
 *
 * @desc get a collection of Comments from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = function getCollection(query, cb) {
  debug('fetching a collection of Comments');

  Comment.find(query)
    .populate(population)
    .exec(function getCommentsCollection(err, Comments) {
      if(err) {
        return cb(err);
      }
      
      return cb(null, Comments);
  });

};

exports.getCollectionBYPagination = function getCollectionBYPagination(query,queryOpts, cb) {

  Comment.paginate(query, queryOpts, function (err, result) {
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

  