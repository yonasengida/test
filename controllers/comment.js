// Load Module Dependencies
var event = require('events');
var debug = require('debug')('eagles-api:Controllers');;
var CommentDal    = require('../dal/comment');
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
 * Validate Comment
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
    CommentDal.get({ _id: id }, function (err, doc) {
      if (doc._id) {
        req.doc = doc._id;
        next();
      } else {
        res.status(404)
          .json({
            error: true, status: 404,
            message: 'Comment _id ' + id + ' not found'
          });
      }
    });
  }
    
};
/**
 * Create Comment
 * @param {req} HTTP Request
 * @param {res} HTTP Response
 * @param {next} Middleware Dispatcher
 * 
 */
exports.createComment = function createComment(req, res, next) {
  var body = req.body;
  var workflow = new event.EventEmitter();
  workflow.on('validateInput', function validate() {
    debug('validate Comment Input');
    req.checkBody('content', 'Content  should not be empty!')
      .notEmpty();

    req.checkBody('contact', 'Contact  should not be empty!')
      .notEmpty();
    var validationErrors = req.validationErrors();

    if (validationErrors) {
      res.status(400);
      res.json(validationErrors);
    }
    else {
      workflow.emit('createComment');
    }
    
  });

   

    workflow.on('createComment', function createComment() {
      CommentDal.create(body, function createComment(err, doc){
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
 * Get Comment
 * @param {req} HTTP Request
 * @param {res} HTTP Response
 * @param {next} Middleware Dispatcher
 * 
 */
exports.getComment = function getComment(req, res, next) {
  res.json(req.doc);
};
/**
 * Get Comments
 * @param {req} HTTP Request
 * @param {res} HTTP Response
 * @param {next} Middleware Dispatcher
 * 
 */
exports.getComments = function getComments(req, res, next) {
  CommentDal.getCollection({}, function getAllComments(err, docs) {
    if (err) {
      return next(err);
    }
    res.json(docs);
  });
};
/**
 * Update Comment
 * @param {req} HTTP Requst
 * @param {res} HTTP Response
 * @param {next} Middleware Dispatcher
 * 
 */
exports.updateComment = function updateComment(req, res, next) {
  CommentDal.update({ _id: req.doc_id }, body, function updateCommentCb(err, doc) {
    if (err) {
      return next(err);
    }
    res.json(err);
  });
};
/**
 * Get Comments by pagination
 * @param {req} HTTP Request
 * @param {res} HTTP Response
 * @param {next} MIddle Dispatcher
 * 
 */
exports.getCommentsByPagination = function getCommentsByPagination(req, res, next){

 var query ={};
 // retrieve pagination query params
 var page   = req.query.page;
 var limit  = req.query.per_page;
 var queryOpts ={
   page:page,
   limit:limit
  };

  CommentDal.getCollectionBYPagination(query,queryOpts, function getByPaginationCb(err, doc) {
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
req.checkBody('CommentId','invalid Cutomer Id').notEmpty().isMongoId('CommentId').withMessage('Wrong ID is passed');;
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
        CommentDal.get({ _id:body.CommentId,job_category: { $in: [body.job_category] } }, function getCommentJobCategory(err, doc) {
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
        console.log(body.CommentId+body.job_category);
        CommentDal.update({_id:body.CommentId},{$push:{job_category:body.job_category}}, function addJobCategory(err, doc){
            if(err){
                return nect(err);
            }
            res.status(201);
            res.json(doc);
        });
    });

    workflow.emit('inputValidation');
};