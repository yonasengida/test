// Load Module Dependencies
var event = require('events');
var debug = require('debug')('eagles-api:Controllers');;
var NewsDal    = require('../dal/news');
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
 * Validate News
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
    NewsDal.get({ _id: id }, function (err, doc) {
      if (doc._id) {
        req.doc = doc._id;
        next();
      } else {
        res.status(404)
          .json({
            error: true, status: 404,
            message: 'News _id ' + id + ' not found'
          });
      }
    });
  }
    
};
/**
 * Create News
 * @param {req} HTTP Request
 * @param {res} HTTP Response
 * @param {next} Middleware Dispatcher
 * 
 */
exports.createNews = function createNews(req, res, next) {
  var body = req.body;
  var workflow = new event.EventEmitter();
  workflow.on('validateInput', function validate() {

    workflow.emit('checkDuplication');
  });

    workflow.on('checkDuplication', function checkDuplication() {
        NewsDal.get({title:body.title}, function checkDup(err,doc){
          if(err){
            return next(err);
          }
          if(doc._id){
            res.status(409);
            res.json({
              error:true,
              msg:"News is already exist",
              status:409
            });
            return;
          }
          workflow.emit('createNews');
        });
      
    });

    workflow.on('createNews', function createNews() {
      NewsDal.create(body, function createNews(err, news){
        if(err){
          return next(err);
        }
         workflow.emit('respond', news)
      });
     
    });

    workflow.on('respond', function respond(doc){
      res.status(201);
      res.json(doc);
    });
    workflow.emit('validateInput');
};
/**
 * Get News
 * @param {req} HTTP Request
 * @param {res} HTTP Response
 * @param {next} Middleware Dispatcher
 * 
 */
exports.getNews = function getNews(req, res, next) {
  res.json(req.doc);
};
/**
 * Get Newss
 * @param {req} HTTP Request
 * @param {res} HTTP Response
 * @param {next} Middleware Dispatcher
 * 
 */
exports.getNewss = function getNewss(req, res, next) {
  NewsDal.getCollection({}, function getAllNewss(err, docs) {
    if (err) {
      return next(err);
    }
    res.json(docs);
  });
};
/**
 * Update News
 * @param {req} HTTP Requst
 * @param {res} HTTP Response
 * @param {next} Middleware Dispatcher
 * 
 */
exports.updateNews = function updateNews(req, res, next) {
  NewsDal.update({ _id: req.doc_id }, body, function updateNewsCb(err, doc) {
    if (err) {
      return next(err);
    }
    res.json(err);
  });
};
/**
 * Get Newss by pagination
 * @param {req} HTTP Request
 * @param {res} HTTP Response
 * @param {next} MIddle Dispatcher
 * 
 */
exports.getNewssByPagination = function getNewssByPagination(req, res, next){

 var query ={};
 // retrieve pagination query params
 var page   = req.query.page;
 var limit  = req.query.per_page;
 var queryOpts ={
   page:page,
   limit:limit
  };

  NewsDal.getCollectionBYPagination(query,queryOpts, function getByPaginationCb(err, doc) {
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
req.checkBody('NewsId','invalid Cutomer Id').notEmpty().isMongoId('NewsId').withMessage('Wrong ID is passed');;
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
        NewsDal.get({ _id:body.NewsId,job_category: { $in: [body.job_category] } }, function getNewsJobCategory(err, doc) {
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
        console.log(body.NewsId+body.job_category);
        NewsDal.update({_id:body.NewsId},{$push:{job_category:body.job_category}}, function addJobCategory(err, doc){
            if(err){
                return nect(err);
            }
            res.status(201);
            res.json(doc);
        });
    });

    workflow.emit('inputValidation');
};