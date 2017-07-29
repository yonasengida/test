// Load Module Dependencies
var event = require('events');
var debug = require('debug')('eagles-api:Controllers');;
var LogDal    = require('../dal/log');


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
 * Validate Log
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
    LogDal.get({ _id: id }, function (err, doc) {
      if (doc._id) {
        req.doc = doc._id;
        next();
      } else {
        res.status(404)
          .json({
            error: true, status: 404,
            msg: 'Log _id ' + id + ' not found'
          });
      }
    });
  }
    
};
/**
 * Create Log
 * @param {req} HTTP Request
 * @param {res} HTTP Response
 * @param {next} Middleware Dispatcher
 * 
 */
exports.createLog = function createLog(req, res, next) {
     
      LogDal.create(body, function createLog(err, doc){
        if(err){
          return next(err);
        }
        res.status(201);
        res.json(doc);
       });
  
   

    
   
};
/**
 * Get Log
 * @param {req} HTTP Request
 * @param {res} HTTP Response
 * @param {next} Middleware Dispatcher
 * 
 */
exports.getLog = function getLog(req, res, next) {
  res.json(req.doc);
};
/**
 * Get Logs
 * @param {req} HTTP Request
 * @param {res} HTTP Response
 * @param {next} Middleware Dispatcher
 * 
 */
exports.getLogs = function getLogs(req, res, next) {
  LogDal.getCollection({}, function getAllLogs(err, docs) {
    if (err) {
      return next(err);
    }
    res.json(docs);
  });
};
/**
 * Update Log
 * @param {req} HTTP Requst
 * @param {res} HTTP Response
 * @param {next} Middleware Dispatcher
 * 
 */
exports.updateLog = function updateLog(req, res, next) {
  LogDal.update({ _id: req.doc_id }, body, function updateLogCb(err, doc) {
    if (err) {
      return next(err);
    }
    res.json(err);
  });
};
/**
 * Get Logs by pagination
 * @param {req} HTTP Request
 * @param {res} HTTP Response
 * @param {next} MIddle Dispatcher
 * 
 */
exports.getLogsByPagination = function getLogsByPagination(req, res, next){

 var query ={};
 // retrieve pagination query params
 var page   = req.query.page;
 var limit  = req.query.per_page;
 var queryOpts ={
   page:page,
   limit:limit
  };

  LogDal.getCollectionBYPagination(query,queryOpts, function getByPaginationCb(err, doc) {
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
req.checkBody('job_category','invalid job category').notEmpty().isMongoId('job_category').withMessage('Wrong ID is passed');;
req.checkBody('LogId','invalid Cutomer Id').notEmpty().isMongoId('LogId').withMessage('Wrong ID is passed');;
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
        LogDal.get({ _id:body.LogId,job_category: { $in: [body.job_category] } }, function getLogJobCategory(err, doc) {
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
        console.log(body.LogId+body.job_category);
        LogDal.update({_id:body.LogId},{$push:{job_category:body.job_category}}, function addJobCategory(err, doc){
            if(err){
                return nect(err);
            }
            res.status(201);
            res.json(doc);
        });
    });

    workflow.emit('inputValidation');
};