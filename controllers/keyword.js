// Load Module Dependencies
var event = require('events');
var debug = require('debug')('eagles-api:Controllers');;
var KeywordDal    = require('../dal/keyword');

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
 * Validate keyword
 * @param {req} HTTP Request
 * @param {res} HTTP Response
 * @param {next} Middleware Dispatcher
 * 
 */
exports.validate = function validate(req, res, next,id) {
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
    KeywordDal.get({ _id: id }, function (err, doc) {
      if (doc._id) {
        req.doc = doc;
        next();
      } else {
        res.status(404)
          .json({
            error: true, status: 404,
            msg: 'keyword _id ' + id + ' not found'
          });
      }
    });
  }
    
};
/**
 * Create keyword
 * @param {req} HTTP Request
 * @param {res} HTTP Response
 * @param {next} Middleware Dispatcher
 * 
 */
exports.createkeyword = function createkeyword(req, res, next) {
  var body = req.body;
  var workflow = new event.EventEmitter();
  
    workflow.on('createkeyword', function createkeyword() {
      KeywordDal.create(body, function createkeyword(err, keyword){
        if(err){
          return next(err);
        }
         workflow.emit('respond', keyword)
      });
     
    });

    workflow.on('respond', function respond(doc){
      res.status(201);
      res.json(doc);
    });
    workflow.emit('createkeyword');
};
/**
 * Get keyword
 * @param {req} HTTP Request
 * @param {res} HTTP Response
 * @param {next} Middleware Dispatcher
 * 
 */
exports.getkeyword = function getkeyword(req, res, next) {
  res.json(req.doc);
};
/**
 * Get keywords
 * @param {req} HTTP Request
 * @param {res} HTTP Response
 * @param {next} Middleware Dispatcher
 * 
 */
exports.getkeywords = function getkeywords(req, res, next) {
  KeywordDal.getCollection({}, function getAllkeywords(err, docs) {
    if (err) {
      return next(err);
    }
    res.json(docs);
  });
};
/**
 * Update keyword
 * @param {req} HTTP Requst
 * @param {res} HTTP Response
 * @param {next} Middleware Dispatcher
 * 
 */
exports.updatekeyword = function updatekeyword(req, res, next) {
  keywordDal.update({ _id: req.doc_id }, body, function updatekeywordCb(err, doc) {
    if (err) {
      return next(err);
    }
    res.json(err);
  });
};
/**
 * Get keywords by pagination
 * @param {req} HTTP Request
 * @param {res} HTTP Response
 * @param {next} MIddle Dispatcher
 * 
 */
exports.getkeywordsByPagination = function getkeywordsByPagination(req, res, next){

 var query ={};
 // retrieve pagination query params
 var page   = req.query.page;
 var limit  = req.query.per_page;
 var queryOpts ={
   page:page,
   limit:limit
  };

  keywordDal.getCollectionBYPagination(query,queryOpts, function getByPaginationCb(err, doc) {
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
req.checkBody('keywordId','invalid Cutomer Id').notEmpty().isMongoId('keywordId').withMessage('Wrong ID is passed');;
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
        keywordDal.get({ _id:body.keywordId,job_category: { $in: [body.job_category] } }, function getkeywordJobCategory(err, doc) {
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
        console.log(body.keywordId+body.job_category);
        keywordDal.update({_id:body.keywordId},{$push:{job_category:body.job_category}}, function addJobCategory(err, doc){
            if(err){
                return nect(err);
            }
            res.status(201);
            res.json(doc);
        });
    });

    workflow.emit('inputValidation');
};