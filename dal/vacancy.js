// Access Layer for Vacancy Data.

// NOTES:
// .population() specifies the references that you want
// mongodb to fill in with the corresponding document
// instead of returning an id.

/**
 * Load Module Dependencies.
 */
var debug   = require('debug')('eagle-api:dal-Vacancy');
var moment  = require('moment');

var Vacancy        = require('../models/vacancy');

var population = [
 // path: 'job_category'
];
/**
 * create a new Vacancy.
 *
 * @desc  creates a new Vacancy and saves them
 *        in the databasex
 *
 * @param {Object}  VacancyData  Data for the Vacancy to create
 * @param {Function} cb       Callback for once saving is complete
 */
exports.create = function create(vacancyData, cb) {
  debug('creating a new Vacancy');

  // Create Vacancy
  var vacancyModel  = new Vacancy(vacancyData);

  vacancyModel.save(function saveVacancy(err, data) {
    if (err) {
      return cb(err);
    }


    exports.get({ _id: data._id }, function (err, vacancy) {
      if(err) {
        return cb(err);
      }

      cb(null, vacancy);

    });

  });

};

/**
 * delete a Vacancy
 *
 * @desc  delete data of the Vacancy with the given
 *        id
 *
 * @param {Object}  query   Query Object
 * @param {Function} cb Callback for once delete is complete
 */
exports.delete = function deleteItem(query, cb) {
  debug('deleting Vacancy: ');

  Vacancy
    .findOne(query)
    .populate(population)
    .exec(function deleteVacancy(err, vacancy) {
      if (err) {
        return cb(err);
      }

      if(!vacancy) {
        return cb(null, {});
      }

      Vacancy.remove(function(err) {
        if(err) {
          return cb(err);
        }

        cb(null, vacancy);

      });

    });
};

/**
 * update a Vacancy
 *
 * @desc  update data of the Vacancy with the given
 *        id
 *
 * @param {Object} query Query object
 * @param {Object} updates  Update data
 * @param {Function} cb Callback for once update is complete
 */
exports.update = function update(query, updates, cb) {
  debug('updating Vacancy: ');

  var now = moment().toISOString();

  updates.last_modified = now;

  Vacancy
    .findOneAndUpdate(query, updates)
    .populate(population)
    .exec(function updateVacancy(err, vacancy) {
      if(err) {
        return cb(err);
      }

      cb(null, vacancy || {});
    });
};

/**
 * get a Vacancy.
 *
 * @desc get a Vacancy with the given id from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.get = function get(query, cb) {
  debug('getting Vacancy ');

  Vacancy
    .findOne(query)
    .populate(population)
    .sort({due_date: 'desc'})
    .exec(function(err, vacancy) {
      if(err) {
        return cb(err);
      }

      cb(null, vacancy || {});
    });
};

/**
 * get a collection of Vacancys
 *
 * @desc get a collection of Vacancys from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = function getCollection(query, cb) {
  debug('fetching a collection of Vacancys');

  Vacancy.find(query)
    .populate(population)
    .sort({due_date: 'desc'})
    .exec(function getVacancysCollection(err, vacancies) {
      if(err) {
        return cb(err);
      }
      
      return cb(null, vacancies);
  });

};

exports.getCollectionBYPagination = function getCollectionBYPagination(query,queryOpts, cb) {

  Vacancy.paginate(query, queryOpts, function (err, result) {
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

  