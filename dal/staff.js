// Access Layer for Staff Data.

// NOTES:
// .population() specifies the references that you want
// mongodb to fill in with the corresponding document
// instead of returning an id.

/**
 * Load Module Dependencies.
 */
var debug   = require('debug')('api:dal-staff');
var moment  = require('moment');

var Staff        = require('../models/staff');

var population = [{
  path: 'profile'
}];

/**
 * create a new staff.
 *
 * @desc  creates a new staff and saves them
 *        in the database
 *
 * @param {Object}  staffData  Data for the staff to create
 * @param {Function} cb       Callback for once saving is complete
 */
exports.create = function create(staffData, cb) {
  debug('creating a new staff');

  // Create staff
  var staffModel  = new Staff(staffData);

  staffModel.save(function saveStaff(err, data) {
    if (err) {
      return cb(err);
    }


    exports.get({ _id: data._id }, function (err, staff) {
      if(err) {
        return cb(err);
      }

      cb(null, staff);

    });

  });

};

/**
 * delete a staff
 *
 * @desc  delete data of the staff with the given
 *        id
 *
 * @param {Object}  query   Query Object
 * @param {Function} cb Callback for once delete is complete
 */
exports.delete = function deleteItem(query, cb) {
  debug('deleting staff: ', query);

  Staff
    .findOne(query, returnFields)
    .populate(population)
    .exec(function deleteStaff(err, staff) {
      if (err) {
        return cb(err);
      }

      if(!staff) {
        return cb(null, {});
      }

      Staff.remove(function(err) {
        if(err) {
          return cb(err);
        }

        cb(null, staff);

      });

    });
};

/**
 * update a staff
 *
 * @desc  update data of the staff with the given
 *        id
 *
 * @param {Object} query Query object
 * @param {Object} updates  Update data
 * @param {Function} cb Callback for once update is complete
 */
exports.update = function update(query, updates,  cb) {
  debug('updating staff: ', query);

  var now = moment().toISOString();

  updates.last_modified = now;

  Staff
    .findOneAndUpdate(query, updates)
    .populate(population)
    .exec(function updateStaff(err, staff) {
      if(err) {
        return cb(err);
      }

      cb(null, staff || {});
    });
};

/**
 * get a staff.
 *
 * @desc get a staff with the given id from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.get = function get(query, cb) {
  debug('getting staff ', query);

  Staff
    .findOne(query)
    .populate(population)
    .exec(function(err, staff) {
      if(err) {
        return cb(err);
      }

      cb(null, staff || {});
    });
};

/**
 * get a collection of staff
 *
 * @desc get a collection of staffs from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = function getCollection(query, cb) {
  debug('fetching a collection of staffs');

  Staff.find(query)
    .populate(population)
    .exec(function getStaffsCollection(err, staffs) {
      if(err) {
        return cb(err);
      }

      return cb(null, staffs);
  });

};
exports.getCollectionBYPagination = function getCollectionBYPagination(query,queryOpts, cb) {

  Staff.paginate(query, queryOpts, function (err, result) {
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
