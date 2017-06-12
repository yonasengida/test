// Load Module Dependencies
var event = require('events');
var debug =require('debug')('eagles-api:vacancy-controller')
var VacancyDal = require('../dal/vacancy');
var JobcategoryDal = require('../dal/jobcategory');

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
 * Validate Vacancy
 * @param {req} HTTP Request
 * @param {res} HTTP Response
 * @param {next} Middleware Dispatcher
 * 
 */
exports.validate = function validate(req, res, next,id) {
  debug("Validate Vacancy");
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
    VacancyDal.get({ _id: id }, function (err, doc) {
      if (doc._id) {
        req.doc = doc;
        next();
      } else {
        res.status(404)
          .json({
            error: true, status: 404,
            message: 'Vacancy _id ' + id + ' not found'
          });
      }
    });
  }
    
};
/**
 * Create Vacancy
 * @param {req} HTTP Request
 * @param {res} HTTP Response
 * @param {next} Middleware Dispatcher
 * 
 */
exports.createVacancy = function createVacancy(req, res, next) {
   
  var body = req.body;
  var workflow = new event.EventEmitter();
  workflow.on('validateInput', function validate() {
      debug('Valdiate Vacncy Input')
       req.checkBody('code', 'Invalid Vacancy Code').notEmpty().withMessage('Code should not be Empty')
       req.checkBody('position', 'Invalid Position').notEmpty().withMessage('Position should not be Empty')
       req.checkBody('description', 'Invalid Description').notEmpty().withMessage('Description should not be Empty')
       req.checkBody('job_category', 'Invalid Job Category').isMongoId('job_category').notEmpty().withMessage('Job Category should not be Empty')
       req.checkBody('exprience', 'Invalid  Exprience').notEmpty().withMessage('Exprience should not be Empty')
       req.checkBody('due_date', 'Invalid  Due Date').notEmpty().withMessage('Due Date should not be Empty')
       req.checkBody('level', 'Invalid Level').notEmpty().withMessage('Level should not be Empty')
       
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
    debug('Check Duplication');
    VacancyDal.get({ code: body.code }, function checkDup(err, doc) {
      if (err) {
        return next(err);
      }
      if (doc._id) {
        res.status(409);
        res.json({
          error: true,
          msg: "Vacancy is already exist",
          status: 409
        });
       return ;
      } else {
        workflow.emit('checkJobCategoryExistence');
      }
    });

  });
    workflow.on('checkJobCategoryExistence', function checkJC(){
    JobcategoryDal.get({_id:body.job_category},function getJobCategory(err, doc){
      if(err){
        return next(err);
      }
      if(!doc.id){
        res.json({
          error:true,
          msg:"Job Category IS not Found",
          status:404
        });
        return;
      }else{
       workflow.emit('createVacancy');  
      }
   
    });
   
    });
    workflow.on('createVacancy', function createVacancy() {
      debug('Create Vacancy');
      VacancyDal.create(body, function createVacancy(err, doc) {
        if (err) {
          return next(err);
        } 
         res.status(201);
        res.json(doc);


      });
    });
   workflow.emit('validateInput');
};
/**
 * Get Vacancy
 * @param {req} HTTP Request
 * @param {res} HTTP Response
 * @param {next} Middleware Dispatcher
 * 
 */
exports.getVacancy = function getVacancy(req, res, next) {
  res.json(req.doc);
};
/**
 * Get Vacancys
 * @param {req} HTTP Request
 * @param {res} HTTP Response
 * @param {next} Middleware Dispatcher
 * 
 */
exports.getVacancies = function getVacancies(req, res, next) {
  VacancyDal.getCollection({}, function getAllVacancy(err, docs) {
    if (err) {
      return next(err);
    }
    res.json(docs);
  });
};
/**
 * Update Vacancy
 * @param {req} HTTP Requst
 * @param {res} HTTP Response
 * @param {next} Middleware Dispatcher
 * 
 */
exports.updateVacancy = function updateVacancy(req, res, next) {
  debug("Update Vacancy")
  var body = req.body;
  VacancyDal.update({ _id: req.doc._id }, body, function updateVacancyCb(err, doc) {
    if (err) {
      return next(err);
    }
    res.json(doc);
  });
};
/**
 * Get Vacancys by pagination
 * @param {req} HTTP Request
 * @param {res} HTTP Response
 * @param {next} MIddle Dispatcher
 * 
 */
exports.getVacancysByPagination = function getVacancysByPagination(req, res, next){

 var query ={};
 // retrieve pagination query params
 var page   = req.query.page;
 var limit  = req.query.per_page;
 var queryOpts ={
   page:page,
   limit:limit
  };

  VacancyDal.getCollectionBYPagination(query,queryOpts, function getByPaginationCb(err, doc) {
    if (err) {
      return next(err);
    }
    res.json(doc);
  });
};