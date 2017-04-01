// Access Layer for Customer Data.

// NOTES:
// .population() specifies the references that you want
// mongodb to fill in with the corresponding document
// instead of returning an id.

/**
 * Load Module Dependencies.
 */
var debug   = require('debug')('api:dal-Customer');
var moment  = require('moment');

var Customer        = require('../models/customer');

var population = [{
  path: 'profile'
}];
/**
 * create a new Customer.
 *
 * @desc  creates a new Customer and saves them
 *        in the database
 *
 * @param {Object}  CustomerData  Data for the Customer to create
 * @param {Function} cb       Callback for once saving is complete
 */
exports.create = function create(customerData, cb) {
  debug('creating a new Customer');

  // Create Customer
  var customerModel  = new Customer(customerData);

  customerModel.save(function saveCustomer(err, data) {
    if (err) {
      return cb(err);
    }


    exports.get({ _id: data._id }, function (err, customer) {
      if(err) {
        return cb(err);
      }

      cb(null, customer);

    });

  });

};

/**
 * delete a Customer
 *
 * @desc  delete data of the Customer with the given
 *        id
 *
 * @param {Object}  query   Query Object
 * @param {Function} cb Callback for once delete is complete
 */
exports.delete = function deleteItem(query, cb) {
  debug('deleting Customer: ');

  Customer
    .findOne(query, returnFields)
    .populate(population)
    .exec(function deleteCustomer(err, customer) {
      if (err) {
        return cb(err);
      }

      if(!customer) {
        return cb(null, {});
      }

      Customer.remove(function(err) {
        if(err) {
          return cb(err);
        }

        cb(null, Customer);

      });

    });
};

/**
 * update a Customer
 *
 * @desc  update data of the Customer with the given
 *        id
 *
 * @param {Object} query Query object
 * @param {Object} updates  Update data
 * @param {Function} cb Callback for once update is complete
 */
exports.update = function update(query, updates, cb) {
  debug('updating Customer: ');

  var now = moment().toISOString();

  updates.last_modified = now;

  Customer
    .findOneAndUpdate(query, updates)
    .populate(population)
    .exec(function updateCustomer(err, customer) {
      if(err) {
        return cb(err);
      }

      cb(null, customer || {});
    });
};

/**
 * get a Customer.
 *
 * @desc get a Customer with the given id from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.get = function get(query, cb) {
  debug('getting Customer ');

  Customer
    .findOne(query)
    .populate(population)
    .exec(function(err, customer) {
      if(err) {
        return cb(err);
      }

      cb(null, customer || {});
    });
};

/**
 * get a collection of Customers
 *
 * @desc get a collection of Customers from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = function getCollection(query, cb) {
  debug('fetching a collection of Customers');

  Customer.find(query)
    .populate(population)
    .exec(function getCustomersCollection(err, customers) {
      if(err) {
        return cb(err);
      }
      
      return cb(null, customers);
  });

};

exports.getCollectionBYPagination = function getCollectionBYPagination(query,queryOpts, cb) {

  Customer.paginate(query, queryOpts, function (err, result) {
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

  