// Load Module Dependencies
var event = require('events');
var debug = require('debug')('eagles-api:Controllers');;
var CustomerDal    = require('../dal/customer');
var ProfileDal     = require('../dal/profile');

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
 * Validate Customer
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
      message: "Wrong Id",
      status: 404
    });


  } else {
    CustomerDal.get({ _id: id }, function (err, doc) {
      if (doc._id) {
        req.doc = doc._id;
        next();
      } else {
        res.status(404)
          .json({
            error: true, status: 404,
            message: 'Customer _id ' + id + ' not found'
          });
      }
    });
  }
    
};
/**
 * Create Customer
 * @param {req} HTTP Request
 * @param {res} HTTP Response
 * @param {next} Middleware Dispatcher
 * 
 */
exports.createCustomer = function createCustomer(req, res, next) {
  var body = req.body;
  var workflow = new event.EventEmitter();
  workflow.on('validateInput', function validate() {

    workflow.emit('checkDuplication');
  });

    workflow.on('checkDuplication', function checkDuplication() {
        ProfileDal.get({mobile:body.mobile}, function checkDup(err,doc){
          if(err){
            return next(err);
          }
          if(doc._id){
            res.status(409);
            res.json({
              error:true,
              msg:"Customer is already exist",
              status:409
            });
            return;
          }
        });
      workflow.emit('createCustomer');
    });

    workflow.on('createCustomer', function createCustomer() {
      CustomerDal.create(body, function createCustomer(err, customer){
        if(err){
          return next(err);
        }
      });
      workflow.emit('respond', customer)
    });

    workflow.on('respond', function respond(doc){
      res.status(2001);
      res.json(doc);
    });
    workflow.emit('validateInput');
};
/**
 * Get Customer
 * @param {req} HTTP Request
 * @param {res} HTTP Response
 * @param {next} Middleware Dispatcher
 * 
 */
exports.getCustomer = function getCustomer(req, res, next) {
  res.json(req.doc);
};
/**
 * Get Customers
 * @param {req} HTTP Request
 * @param {res} HTTP Response
 * @param {next} Middleware Dispatcher
 * 
 */
exports.getCustomers = function getCustomers(req, res, next) {
  CustomerDal.getCollection({}, function getAllCustomers(err, docs) {
    if (err) {
      return next(err);
    }
    res.json(docs);
  });
};
/**
 * Update Customer
 * @param {req} HTTP Requst
 * @param {res} HTTP Response
 * @param {next} Middleware Dispatcher
 * 
 */
exports.updateCustomer = function updateCustomer(req, res, next) {
  CustomerDal.update({ _id: req.doc_id }, body, function updateCustomerCb(err, doc) {
    if (err) {
      return next(err);
    }
    res.json(err);
  });
};
/**
 * Get Customers by pagination
 * @param {req} HTTP Request
 * @param {res} HTTP Response
 * @param {next} MIddle Dispatcher
 * 
 */
exports.getCustomersByPagination = function getCustomersByPagination(req, res, next){

 var query ={};
 // retrieve pagination query params
 var page   = req.query.page;
 var limit  = req.query.per_page;
 var queryOpts ={
   page:page,
   limit:limit
  };

  CustomerDal.getCollectionBYPagination(query,queryOpts, function getByPaginationCb(err, doc) {
    if (err) {
      return next(err);
    }
    res.json(doc);
  });
};


exports.addJobCategory = function addJobCategory(req, res, next){
  debug('Add Jobcategory');
  var body     = req.body;
  var workflow = new event.EventEmitter();

workflow.on('inputValidation', function inputValidation(){
req.checkBody('job_category','invalid job category').notEmpty().withMessage('Wrong ID is passed');;
req.checkBody('customerId','invalid Cutomer Id').notEmpty().isMongoId('customerId').withMessage('Wrong ID is passed');;
if(req.validationErrors()){
  res.status(400);
  res.json({
    error:true,
    msg:req.validationErrors(),
    status:400
  });
  return;
}
workflow.emit('checkDuplication');
});

   workflow.on('checkDuplication', function checkDuplication() {
     debug('Check Duplication')
        CustomerDal.get({ _id:body.customerId,job_category: { $in: [body.job_category] } }, function getCustomerJobCategory(err, doc) {
            if(err){
                return next(err);
            }
            if(doc._id){
                res.status(409);
                res.json({
                    error:true,
                    msg:"Already Exists",
                    status:409

                });
                return ;
            }else{
                workflow.emit('addCategory');
            }
        });
    });
      workflow.on('addCategory', function addCategory(){
        debug('Add Job Category')
        console.log(body.customerId+body.job_category);
        CustomerDal.update({_id:body.customerId},{$push:{job_category:body.job_category}}, function addJobCategory(err, doc){
            if(err){
                return nect(err);
            }
            res.status(201);
            res.json(doc);
        });
    });

    workflow.emit('inputValidation');
};