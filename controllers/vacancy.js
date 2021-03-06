// Load Module Dependencies
'use strict';
var event = require('events');
var moment = require('moment');
var mysql  = require('mysql');
var debug = require('debug')('eagles-api:vacancy-controller')
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
exports.validate = function validate(req, res, next, id) {
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
console.log('check Input')
  var body = req.body;
  var workflow = new event.EventEmitter();
  workflow.on('validateInput', function validate() {
    debug('Valdiate Vacncy Input')
    req.checkBody('code', 'Invalid Vacancy Code').notEmpty().withMessage('Code should not be Empty')
    req.checkBody('position', 'Invalid Position').notEmpty().withMessage('Position should not be Empty')
    req.checkBody('description', 'Invalid Description').notEmpty().withMessage('Description should not be Empty')
    req.checkBody('category', 'Invalid Job Category').notEmpty().withMessage('Job Category should not be Empty')
    req.checkBody('exprience', 'Invalid  Exprience').notEmpty().withMessage('Exprience should not be Empty')
    req.checkBody('due_date', 'Invalid  Due Date').notEmpty().withMessage('Due Date should not be Empty')
    req.checkBody('level', 'Invalid Level').notEmpty().withMessage('Level should not be Empty')

    if (req.validationErrors()) {
      res.status(400);
      res.json({
        error: true,
        msg: req.validationErrors(),
        status: 400
      });
      return;
    }
console.log(body);
  workflow.emit('checkDuplication');
  });

  workflow.on('checkDuplication', function checkDuplication() {
    debug('Check Duplication');
    console.log('check Duplication')
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
        return;
      } else {

        workflow.emit('createVacancy');
      }
    });

  });

  workflow.on('createVacancy', function createVacancy() {
     console.log('Create Vacancy')
    debug('Create Vacancy');
    console.log(body);
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
 * Create Vacancy Manually
 * @param {req} HTTP Request
 * @param {res} HTTP Response
 * @param {next} Middleware Dispatcher
 *
 */
exports.createVacancyAutoCodeGenerate = function createVacancyAutoCodeGenerate(req, res, next) {
console.log('check Input')
  var body = req.body;
  var workflow = new event.EventEmitter();
workflow.on('generateCode' , function genCode(){

function keyGenerate(keyLength) {
    var i, key = "", characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    var charactersLength = characters.length;

    for (i = 0; i < keyLength; i++) {
        key += characters.substr(Math.floor((Math.random() * charactersLength) + 1), 1);
    }

    return key;
}
var code=keyGenerate(4);
body.code=code;
workflow.emit('checkCodeDuplication');
});
 workflow.on('checkCodeDuplication', function checkDuplication() {
    debug('Check Duplication');
    console.log('checkCodeDuplication')
    VacancyDal.get({ code: body.code }, function checkDup(err, doc) {
      if (err) {
        return next(err);
      }
      if (doc._id) {
         workflow.emit('generateCode');

        return;
      } else {

        workflow.emit('validateInput');
      }
    });

  });

  workflow.on('validateInput', function validate() {

    debug('Valdiate Vacncy Input')
    req.checkBody('code', 'Invalid Vacancy Code').notEmpty().withMessage('Code should not be Empty')
    req.checkBody('position', 'Invalid Position').notEmpty().withMessage('Position should not be Empty')
    req.checkBody('description', 'Invalid Description').notEmpty().withMessage('Description should not be Empty')
    req.checkBody('category', 'Invalid Job Category').notEmpty().withMessage('Job Category should not be Empty')
    req.checkBody('exprience', 'Invalid  Exprience').notEmpty().withMessage('Exprience should not be Empty')
    req.checkBody('due_date', 'Invalid  Due Date').notEmpty().withMessage('Due Date should not be Empty')
    req.checkBody('level', 'Invalid Level').notEmpty().withMessage('Level should not be Empty')

    if (req.validationErrors()) {
      res.status(400);
      res.json({
        error: true,
        msg: req.validationErrors(),
        status: 400
      });
      return;
    }

  workflow.emit('createVacancy');
  });



  workflow.on('createVacancy', function createVacancy() {
     console.log('Create Vacancy')
    debug('Create Vacancy');

body.created_at=moment().toISOString();
console.log(body);
    VacancyDal.create(body, function createVacancy(err, doc) {

      if (err) {
        return next(err);
      }
      res.status(201);
      res.json(doc);


    });
  });
  workflow.emit('generateCode');
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
  // console.log(req._user);
  var opt={};
  VacancyDal.getCollection({},opt, function getAllVacancy(err, docs) {
    if (err) {
      return next(err);
    }
    res.json(docs);
  });
};
/**
 * Get Open Vacancys
 * @param {req} HTTP Request
 * @param {res} HTTP Response
 * @param {next} Middleware Dispatcher
 *
 */
exports.getOPenVacancies = function getOpenVacancies(req, res, next) {
  var opt='description due_date category qualifications exprience position level';
  VacancyDal.getCollection({},opt, function getAllOpenVacancy(err, docs) {
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
exports.getVacancysByPagination = function getVacancysByPagination(req, res, next) {

  var query = {};
  // retrieve pagination query params
  var page = req.query.page;
  var limit = req.query.per_page;
  var queryOpts = {
    page: page,
    limit: limit
  };

  VacancyDal.getCollectionBYPagination(query, queryOpts, function getByPaginationCb(err, doc) {
    if (err) {
      return next(err);
    }
    res.json(doc);
  });
}
exports.searchByDate = function searchByDate(req, res, next) {

  debug("Search By Date");

  var sdate = req.query.sdate;
  var edate = req.query.edate;
  
  if (!sdate||!edate) {
    res.status(400);
    res.json({
      error: true,
      msg: "Query Parameter is required",
      status: 400
    });
    return;
  }
  VacancyDal.getCollection(
    // {$and:[{due_date:{$lte:new Date(edate)}},{due_date:{$gte:new Date(sdate)}}]}
    {$and:[{created_at:{$lte:new Date(edate)}},{created_at:{$gte:new Date(sdate)}}]}
   ,{}, function (err, doc) {
    if (err) {
      return next(err);
    }
    res.json(doc);
  });

};
exports.search = function search(req, res, next) {
  debug("Search");

      // var stream = req.query.stream;
      var exprienceTo = req.query.to;
      var exprienceFrom = req.query.from;
     // console.log(exprienceFrom);
      var category = req.query.category;
      var level = req.query.level;
      var sdate = req.query.sdate;
      var edate = req.query.edate;
    // var start_date = moment(req.query.start_date).toISOString();
    // var end_date = moment(req.query.start_date).toISOString();
     if(!exprienceFrom ||!exprienceTo||!category||!level){
     //  if(!stream){
          res.status(400);
          res.json({
              error:trfue,
              msg:"Query Parameter is required",
              status:400
          });
          return;
      }

  VacancyDal.getCollection({
      $and: [
       { $or: [{ exprience: { $lte: exprienceTo } }, { exprience: true }] },
       { $or: [{ exprience: { $gte: exprienceFrom } }, { exprience: true }] },
       { $or: [{ category: true }, { category: {$regex: category, $options:"$i"} }] },
       { $or: [{ level: true }, { level: level }] },
       {$and:[{created_at:{$lte:new Date(edate)}},{created_at:{$gte:new Date(sdate)}}]}
      // { $or: [{created_at:{$lte:new Date(edate)}},{created_at:{$gte:new Date(sdate)}}]}
    ]
  },{}, function (err, doc) {
    if (err) {
      return next(err);
    }
    res.json(doc);
    });

};
exports.searchByCode = function search(req, res, next) {
  debug("Search By Code");


      var code = req.query.code;

       if(!code){
          res.status(400);
          res.json({
              error:true,
              msg:"Query Parameter is required",
              status:400
          });
          return;
      }
  VacancyDal.get({code:code}, function (err, doc) {
    if (err) {
      return next(err);
    }3
    res.json(doc);
    });

};
exports.searchByCategory = function search(req, res, next) {
  debug("Search");


      var category = req.query.category;

       if(!category){
          res.status(400);
          res.json({
              error:true,
              msg:"Query Parameter is required",
              status:400
          });
          return;
      }
  VacancyDal.getCollection({
        $and: [
      // { $or: [{ exprience: { $lte: exprienceTo } }, { exprience: true }] },
      // { $or: [{ exprience: { $gt: exprienceFrom } }, { exprience: true }] },
       { $or: [{ category: true }, { category: category }] },
       //{ $or: [{ level: true }, { level: level }] },

    ]
  },{}, function (err, doc) {
    if (err) {
      return next(err);
    }3
    res.json(doc);
    });

};

/**
 * Remove Users
 */
exports.removeVacancy = function removeVacancy(req, res, next) {

  VacancyDal.delete({ _id: req.doc._id }, function remove(err, doc){
if(err){
  return next(err);
}
res.json(doc);
  });
};

exports.createVacancyIntoMYSQL = function createVacancyIntoMYSQL(req,res,next){
var body= req.body;
   debug('Valdiate Vacncy Input')
       req.checkBody('title', 'Invalid title').notEmpty().withMessage('Title should not be Empty')
       req.checkBody('qualifications', 'Invalid qualification').notEmpty().withMessage('qualification should not be Empty')
       req.checkBody('description', 'Invalid Description').notEmpty().withMessage('Description should not be Empty')
       req.checkBody('job_category', 'Invalid Job Category').notEmpty().withMessage('Job Category should not be Empty')
       req.checkBody('exprience', 'Invalid  Exprience').notEmpty().withMessage('Exprience should not be Empty')
       req.checkBody('due_date', 'Invalid  Due Date').notEmpty().withMessage('Due Date should not be Empty')
       req.checkBody('level', 'Invalid Level').notEmpty().withMessage('Level should not be Empty')
       req.checkBody('phone', 'Invalid Phone').notEmpty().withMessage('Phone should not be Empty')
       
      if(req.validationErrors()){
          res.status(400);
          res.json({
              error:true,
              msg:req.validationErrors(),
              status:400
          });
        return;
      }
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root@123",
    database: "eagles"
  });

  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

    var sql = "INSERT INTO jobPosts  VALUES (NULL,'"+body.title+"', '"+body.qualifications+"','"+body.exprience+"','"+body.description+"','"+body.phone+"','"+body.due_date+"','"+body.job_category+"','"+body.level+"','')";
    con.query(sql, function (err, result) {
      if (err){
        res.json(err);
        return;
      }
       res.json(result);
    });
  });
};