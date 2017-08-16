// Load Module Dependencies
var event = require('events');
var debug = require('debug')('eagles-api:Controllers');;
var RegisterindexDal    = require('../dal/registerindex');

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
 * Validate registerindex
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
    RegisterindexDal.get({ _id: id }, function (err, doc) {
      if (doc._id) {
        req.doc = doc._id;
        next();
      } else {
        res.status(404)
          .json({
            error: true, status: 404,
            msg: 'registerindex _id ' + id + ' not found'
          });
      }
    });
  }
    
};
/**
 * Create registerindex
 * @param {req} HTTP Request
 * @param {res} HTTP Response
 * @param {next} Middleware Dispatcher
 * 
 */
exports.createregisterindex = function createregisterindex(req, res, next) {
  var body = req.body;
  var workflow = new event.EventEmitter();
  
    workflow.on('createregisterindex', function createregisterindex() {
      RegisterindexDal.create(body, function createregisterindex(err, registerindex){
        if(err){
          return next(err);
        }
         workflow.emit('respond', registerindex)
      });
     
    });

    workflow.on('respond', function respond(doc){
      res.status(201);
      res.json(doc);
    });
    workflow.emit('createregisterindex');
};
/**
 * Get registerindex
 * @param {req} HTTP Request
 * @param {res} HTTP Response
 * @param {next} Middleware Dispatcher
 * 
 */
exports.getregisterindex = function getregisterindex(req, res, next) {
  res.json(req.doc);
};
/**
 * Get registerindexs
 * @param {req} HTTP Request
 * @param {res} HTTP Response
 * @param {next} Middleware Dispatcher
 * 
 */
exports.getregisterindexs = function getregisterindexs(req, res, next) {
  RegisterindexDal.getCollection({}, function getAllregisterindexs(err, docs) {
    if (err) {
      return next(err);
    }
    res.json(docs);
  });
};
/**
 * Update registerindex
 * @param {req} HTTP Requst
 * @param {res} HTTP Response
 * @param {next} Middleware Dispatcher
 * 
 */
exports.updateregisterindex = function updateregisterindex(req, res, next) {
  registerindexDal.update({ _id: req.doc_id }, body, function updateregisterindexCb(err, doc) {
    if (err) {
      return next(err);
    }
    res.json(err);
  });
};
/**
 * Get registerindexs by pagination
 * @param {req} HTTP Request
 * @param {res} HTTP Response
 * @param {next} MIddle Dispatcher
 * 
 */
exports.getregisterindexsByPagination = function getregisterindexsByPagination(req, res, next){

 var query ={};
 // retrieve pagination query params
 var page   = req.query.page;
 var limit  = req.query.per_page;
 var queryOpts ={
   page:page,
   limit:limit
  };

  registerindexDal.getCollectionBYPagination(query,queryOpts, function getByPaginationCb(err, doc) {
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
req.checkBody('registerindexId','invalid Cutomer Id').notEmpty().isMongoId('registerindexId').withMessage('Wrong ID is passed');;
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
        RegisterindexDal.get({ _id:body.registerindexId,job_category: { $in: [body.job_category] } }, function getregisterindexJobCategory(err, doc) {
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
        console.log(body.registerindexId+body.job_category);
        RegisterindexDal.update({_id:body.registerindexId},{$push:{job_category:body.job_category}}, function addJobCategory(err, doc){
            if(err){
                return nect(err);
            }
            res.status(201);
            res.json(doc);
        });
    });

    workflow.emit('inputValidation');
};