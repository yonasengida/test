// Access Layer for JobCategory Data.

// NOTES:
// .population() specifies the references that you want
// mongodb to fill in with the corresponding document
// instead of returning an id.

/**
 * Load Module Dependencies.
 */
var debug   = require('debug')('eagle-api:dal-JobCategory');
var moment  = require('moment');

var JobCategory        = require('../models/jobcategory');

var population = [];
/**
 * create a new JobCategory.
 * @desc  creates a new JobCategory and saves them
 *        in the database
 *
 * @param {Object}  JobCategoryData  Data for the JobCategory to create
 * @param {Function} cb       Callback for once saving is complete
 */
exports.create = function create(jobCategoryData, cb) {
  debug('creating a new JobCategory');

  // Create JobCategory
  var jobCategoryModel  = new JobCategory(jobCategoryData);

  jobCategoryModel.save(function saveJobCategory(err, data) {
    if (err) {
      return cb(err);
    }


    exports.get({ _id: data._id }, function (err, doc) {
      if(err) {
        return cb(err);
      }

      cb(null, doc);

    });

  });

};

/**
 * delete a JobCategory
 *
 * @desc  delete data of the JobCategory with the given
 *        id
 *
 * @param {Object}  query   Query Object
 * @param {Function} cb Callback for once delete is complete
 */
exports.delete = function deleteItem(query, cb) {
  debug('deleting JobCategory: ');

  JobCategory
    .findOne(query, returnFields)
    .populate(population)
    .exec(function deleteJobCategory(err, doc) {
      if (err) {
        return cb(err);
      }

      if(!doc) {
        return cb(null, {});
      }

      JobCategory.remove(function(err) {
        if(err) {
          return cb(err);
        }

        cb(null, doc);

      });

    });
};

/**
 * update a JobCategory
 *
 * @desc  update data of the JobCategory with the given
 *        id
 *
 * @param {Object} query Query object
 * @param {Object} updates  Update data
 * @param {Function} cb Callback for once update is complete
 */
exports.update = function update(query, updates, cb) {
  debug('updating JobCategory: ');

  var now = moment().toISOString();

  updates.last_modified = now;

  JobCategory
    .findOneAndUpdate(query, updates)
    .populate(population)
    .exec(function updateJobCategory(err, doc) {
      if(err) {
        return cb(err);
      }

      cb(null, doc || {});
    });
};

/**
 * get a JobCategory.
 *
 * @desc get a JobCategory with the given id from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.get = function get(query, cb) {
  debug('getting JobCategory ');

  JobCategory
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
 * get a collection of JobCategorys
 *
 * @desc get a collection of JobCategorys from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = function getCollection(query, cb) {
  debug('fetching a collection of JobCategorys');

  JobCategory.find(query)
    .populate(population)
    .exec(function getJobCategorysCollection(err, docs) {
      if(err) {
        return cb(err);
      }
      
      return cb(null, docs);
  });

};

exports.getCollectionBYPagination = function getCollectionBYPagination(query,queryOpts, cb) {

  JobCategory.paginate(query, queryOpts, function (err, result) {
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

  