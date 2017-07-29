// Load Module Dependencies
var event = require('events');
var debug = require('debug')('eagles-api:Controllers');

var JobCategoryDal    = require('../dal/jobcategory');

/**
 * NOOP
 * @param {req} HTTP Request
 * @param {res} HTTP Response
 * @param {next} Middleware Dispatcher
 * 
 */
exports.noop = function (req, res, next) {
    res.json({
        msg: "To Be Implemeted"
    });
};
/**
 * Validate JobCategory
 * @param {req} HTTP Request
 * @param {res} HTTP Response
 * @param {next} Middleware Dispatcher
 * 
 */
exports.validate = function validate(req, res, next) {
  //Validate the id is mongoid or not
  req.checkParams('id', 'Invalid urlparam').isMongoId(id);

  var validationErrors = req.validationErrors();

  if (validationErrors) {


    res.status(404).json({
      error: true,
      msg: "Wrong Id",
      status: 404
    });


  } else {
    JobCategoryDal.get({ _id: id }, function (err, doc) {
      if (doc._id) {
        req.doc = doc._id;
        next();
      } else {
        res.status(404)
          .json({
            error: true, status: 404,
            msg: 'JobCategory _id ' + id + ' not found'
          });
      }
    });
  }
    
};
/**
 * Create JobCategory
 * @param {req} HTTP Request
 * @param {res} HTTP Response
 * @param {next} Middleware Dispatcher
 * 
 */
exports.createJobCategory = function createJobCategory(req, res, next) {
  var body = req.body;
  var workflow = new event.EventEmitter();
  workflow.on('validateInput', function validate() {
    req.checkBody('name', 'Invalid Job Category').notEmpty().withMessage('Job Catgory should not be Empty');
    if(req.validationErrors()){
      res.status(400);
      res.json({
        error:true,
        msg:req.validationErrors(),
        status:400
      })
    }
    workflow.emit('checkDuplication');
  });

    workflow.on('checkDuplication', function checkDuplication() {
        JobCategoryDal.get({name:body.name}, function checkDup(err,doc){
          if(err){
            return next(err);
          }
          if(doc._id){
            res.status(409);
            res.json({
              error:true,
              msg:"Job Category is already exist",
              status:409
            });
            return;
          }
           workflow.emit('createJobCategory');
        });
     
    });

    workflow.on('createJobCategory', function createJobCategory() {
      JobCategoryDal.create(body, function createJobCategory(err, doc){
        if(err){
          return next(err);
        }
          res.status(201);
         res.json(doc);
      });
     
    });
  
    workflow.emit('validateInput');
};
/**
 * Get JobCategory
 * @param {req} HTTP Request
 * @param {res} HTTP Response
 * @param {next} Middleware Dispatcher
 * 
 */
exports.getJobCategory = function getJobCategory(req, res, next) {
  res.json(req.doc);
};
/**
 * Get JobCategorys
 * @param {req} HTTP Request
 * @param {res} HTTP Response
 * @param {next} Middleware Dispatcher
 * 
 */
exports.getJobCategorys = function getJobCategorys(req, res, next) {
  debug("Fetching Job Category")
  console.log("Fetching Job Category")
 // console.log(req._user._id);
  JobCategoryDal.getCollection({}, function getAllJobCategorys(err, docs) {
    if (err) {
      return next(err);
    }
    res.json(docs);
  });
};
/**
 * Update JobCategory
 * @param {req} HTTP Requst
 * @param {res} HTTP Response
 * @param {next} Middleware Dispatcher
 * 
 */
exports.updateJobCategory = function updateJobCategory(req, res, next) {
  JobCategoryDal.update({ _id: req.doc_id }, body, function updateJobCategoryCb(err, doc) {
    if (err) {
      return next(err);
    }
    res.json(err);
  });
};
/**
 * Get JobCategorys by pagination
 * @param {req} HTTP Request
 * @param {res} HTTP Response
 * @param {next} MIddle Dispatcher
 * 
 */
exports.getJobCategorysByPagination = function getJobCategorysByPagination(req, res, next){

 var query ={};
 // retrieve pagination query params
 var page   = req.query.page;
 var limit  = req.query.per_page;
 var queryOpts ={
   page:page,
   limit:limit
  };

  JobCategoryDal.getCollectionBYPagination(query,queryOpts, function getByPaginationCb(err, doc) {
    if (err) {
      return next(err);
    }
    res.json(doc);
  });
};