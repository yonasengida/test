// Load Module Dependencies
var event = require('events');
var debug = require('debug')('eagles-api:Controllers');
var moment = require('moment');

var Level1ConfrimationkeyDal = require('../dal/level1confrimationkey');
var Level2ConfrimationkeyDal = require('../dal/level2confrimationkey');
var Level3ConfrimationkeyDal = require('../dal/level3confrimationkey');

var CustomerDal = require('../dal/customer');


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
 * Validate Confrimationkey
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
        ConfrimationkeyDal.get({ _id: id }, function (err, doc) {
            if (doc._id) {
                req.doc = doc._id;
                next();
            } else {
                res.status(404)
                    .json({
                        error: true, status: 404,
                        message: 'Confrimationkey _id ' + id + ' not found'
                    });
            }
        });
    }

};
/**
 * Create Confrimationkey
 * @param {req} HTTP Request
 * @param {res} HTTP Response
 * @param {next} Middleware Dispatcher
 * 
 */
exports.createConfrimationkey = function createConfrimationkey(req, res, next) {
    var now = moment().toISOString();
    var body = req.body;
    var workflow = new event.EventEmitter();
    body.status="inactive";
    body.updated_at=now;
    body.created_at=now;
    body.due_date = moment().add(2, 'months').toISOString();
 
    /**
     * Validate Input
     */
    workflow.on('validateInput', function validate() {
        debug('validate Confrimationkey Input');

        // req.checkBody('key', 'Key  should not be empty!')
        //     .notEmpty();
        req.checkBody('level', 'Level  should not be empty!')
            .notEmpty().isIn(['level1', 'level2','level3']).withMessage('Level Should be level1 , level2 or level3');
        req.checkBody('due_date', 'Due Date  should not be empty!')
            .notEmpty();
        var validationErrors = req.validationErrors();

        if (validationErrors) {
            res.status(400);
            res.json(validationErrors);
        }
        else {
            workflow.emit('generateCode');
        }

    });
    /**
     * Genrate Code
     */
    workflow.on('generateCode', function genCode() {

        function keyGenerate(keyLength) {
            var i, key = "", characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

            var charactersLength = characters.length;

            for (i = 0; i < keyLength; i++) {
                key += characters.substr(Math.floor((Math.random() * charactersLength) + 1), 1);
            }

            return key;
        }

        body.key = keyGenerate(9);
        workflow.emit('checkCodeDuplication');

       
    });
    workflow.on('checkCodeDuplication', function checkDuplication() {
        debug('Check Duplication');
        var check_level=body.level;
        if (check_level === "level1") {
            Level1ConfrimationkeyDal.get({ key: body.key }, function checkDup(err, doc) {
                if (err) {
                    return next(err);
                }
                if (doc._id) {
                    workflow.emit('generateCode');

                    return;
                } else {

                    workflow.emit('createConfrimationkey');
                }
            });
        }
        else if(check_level === "level2"){
           Level2ConfrimationkeyDal.get({ key: body.key }, function checkDup(err, doc) {
                if (err) {
                    return next(err);
                }
                if (doc._id) {
                    workflow.emit('generateCode');

                    return;
                } else {

                    workflow.emit('createConfrimationkey');
                }
            });  
        } else if(check_level === "level3"){
           Level3ConfrimationkeyDal.get({ key: body.key }, function checkDup(err, doc) {
                if (err) {
                    return next(err);
                }
                if (doc._id) {
                    workflow.emit('generateCode');

                    return;
                } else {

                    workflow.emit('createConfrimationkey');
                }
            });  
        }
    
    });
  
    workflow.on('createConfrimationkey', function createConfrimationkey() {
      console.log("Create confriamtion key")
      console.log(body.level)
        if(body.level === "level1") {
             console.log("Create confriamtion key level 1")
            Level1ConfrimationkeyDal.create(body, function createConfrimationkey(err, doc) {
                if (err) {
                    return next(err);
                }
                res.status(201);
                res.json(doc);
            });
        }
        else if (body.level === "level2") {
             console.log("Create confriamtion key level 2")
            Level2ConfrimationkeyDal.create(body, function createConfrimationkey(err, doc) {
                if (err) {
                    return next(err);
                }
                res.status(201);
                res.json(doc);
            });
        }
        else if (body.level === "level3") {
             console.log("Create confriamtion key level 3")
            Level3ConfrimationkeyDal.create(body, function createConfrimationkey(err, doc) {
                if (err) {
                    return next(err);
                }
                res.status(201);
                res.json(doc);
            });
        }
        else{
            res.json({
                error:true,
                msg:"Error is happen"
            })
        }
       

    });

    workflow.emit('validateInput');
    
};
/**
 * Get Confrimationkey
 * @param {req} HTTP Request
 * @param {res} HTTP Response
 * @param {next} Middleware Dispatcher
 * 
 */
exports.getConfrimationkey = function getConfrimationkey(req, res, next) {
    res.json(req.doc);
};
/**
 * Get Confrimationkeys
 * @param {req} HTTP Request
 * @param {res} HTTP Response
 * @param {next} Middleware Dispatcher
 * 
 */

exports.getConfrimationkeyslevel1 = function getConfrimationkeys(req, res, next) {
    Level1ConfrimationkeyDal.getCollection({}, function getAllConfrimationkeys(err, docs) {
        if (err) {
            return next(err);
        }
        res.json(docs);
    });
};
exports.getConfrimationkeyslevel2 = function getConfrimationkeys(req, res, next) {
    Level2ConfrimationkeyDal.getCollection({}, function getAllConfrimationkeys(err, docs) {
        if (err) {
            return next(err);
        }
        res.json(docs);
    });
};
exports.getConfrimationkeyslevel3 = function getConfrimationkeys(req, res, next) {
    Level3ConfrimationkeyDal.getCollection({}, function getAllConfrimationkeys(err, docs) {
        if (err) {
            return next(err);
        }
        res.json(docs);
    });
};

/**
 * Get Confrimationkeys by pagination
 * @param {req} HTTP Request
 * @param {res} HTTP Response
 * @param {next} MIddle Dispatcher
 * 
 */
exports.getConfrimationkeysByPagination = function getConfrimationkeysByPagination(req, res, next) {

    var query = {};
    // retrieve pagination query params
    var page = req.query.page;
    var limit = req.query.per_page;
    var queryOpts = {
        page: page,
        limit: limit
    };

    ConfrimationkeyDal.getCollectionBYPagination(query, queryOpts, function getByPaginationCb(err, doc) {
        if (err) {
            return next(err);
        }
        res.json(doc);
    });
};

exports.generateKey = function generateKey(req, res, next) {
    function keyGenerate(keyLength) {
        var i, key = "", characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        var charactersLength = characters.length;

        for (i = 0; i < keyLength; i++) {
            key += characters.substr(Math.floor((Math.random() * charactersLength) + 1), 1);
        }

        return key;
    }
    for (var i = 1; i < 10; i++) {
        var code = keyGenerate(9);
       
       console.log(code);
    }

};
/**
 * This Interface is used to Sell Cards internally or from back office
 * 
 * Steps
 * 1. Validate Input
 * 2. Check Card status with corresponding Level
 * 2.if Satus is acive u can sell
 */
exports.sellKey = function sellKey(req, res, next){

    var body       = req.body;
    var workflow   = new event.EventEmitter();
    var customerID = body.customer_id;
    var customerLevel = body.customer_level;
    var inputKey        = body.key;
    // Validate Input Here
   workflow.on('validateInput', function validate() {
        debug('validate  Input');

        req.checkBody('key', 'Key  should not be empty!')
        .notEmpty();
        req.checkBody('customer_level', 'Customer Level  should not be empty!')
            .notEmpty().isIn(['1', '2','3','4','5']).withMessage('Level Should be between 1 and 5');
        req.checkBody('customer_id', 'Customer Id should not be empty!')
            .notEmpty();
        var validationErrors = req.validationErrors();

        if (validationErrors) {
            res.status(400);
            res.json(validationErrors);
        }
        else {
            workflow.emit('checkCardStatus');
        }

    });
    workflow.on('checkCardStatus', function checkCardStatus(){
        console.log('check Card status'+customerLevel)
         if(customerLevel*1 === 1){
            Level1ConfrimationkeyDal.get({key:inputKey,status:'inactive'}, function checkKey(err,doc){
                if(err){
                    return next(err);
                }
                console.log(doc);
                if(!doc._id){
                res.json({error:true,msg:"sorry the key is not found or Sold before", status:404});
                return;
                }
                // res.json({msg:"ok level 1"});
                CustomerDal.update({_id:customerID},{$set:{key:inputKey,status:'active'}}, function updateCustomer(err,doc){
                    if(err){
                        return next(err);
                        }
                        Level1ConfrimationkeyDal.update({key:inputKey},{status:'used'}, function updateKey(err,doc){
                            if(err){
                                return next(err);
                            }
                            res.json({msg:"Sucess Fully SOLD",key:doc});
                        });
                    
                });
               
            });
        }else if(customerLevel === 2 || customerLevel === 3){
        Level2ConfrimationkeyDal.get({key:inputKey},{status:'inactive'}, function checkKey(err,doc){
                if(err){
                    return next(err);
                }
            //  if()
                res.json({msg:"ok level 3"});
            });
        }else if(customerLevel >=4){
            Level3ConfrimationkeyDal.get({key:inputKey},{status:'inactive'}, function checkKey(err,doc){
                if(err){
                    return next(err);
                }
                res.json({msg:"ok Level3"});
            });

        }else{
            res.json({error: true,msg:"Wrong Parameter",status:400})
        }
        workflow.emit('updateCustomer');
        });
        workflow.on('updateCustomer', function updateCustomer(){

            workflow.emit('updateCardStatus');
        });
         workflow.on('responsed', function responsed(){

          res.json({msg:"Successfully Sold"});
        });
    workflow.emit('validateInput');
};

/**
 * This interface to activate cards only for mobile users
 */

exports.activateKey = function activateKey(req, res, next){
// here is to active 

    var body       = req.body;
    var workflow   = new event.EventEmitter();
    var customerID = body.customer_id;
    var customerLevel = body.customer_level;
    var inputKey        = body.key;
    // Validate Input Here
   workflow.on('validateInput', function validate() {
        debug('validate  Input');

        req.checkBody('key', 'Key  should not be empty!')
        .notEmpty();
        req.checkBody('customer_level', 'Customer Level  should not be empty!')
            .notEmpty().isIn(['1', '2','3','4','5']).withMessage('Level Should be between 1 and 5');
        req.checkBody('customer_id', 'Customer Id should not be empty!')
            .notEmpty();
        var validationErrors = req.validationErrors();

        if (validationErrors) {
            res.status(400);
            res.json(validationErrors);
        }
        else {
            workflow.emit('checkCardStatus');
        }

    });
    workflow.on('checkCardStatus', function checkCardStatus(){
        console.log('check Card status'+customerLevel)
         if(customerLevel*1 === 1){
            Level1ConfrimationkeyDal.get({key:inputKey,status:'inactive'}, function checkKey(err,doc){
                if(err){
                    return next(err);
                }
                console.log(doc);
                if(!doc._id){
                res.json({error:true,msg:"sorry the key is not found or Sold before", status:404});
                return;
                }
                // res.json({msg:"ok level 1"});
                CustomerDal.update({_id:customerID},{$set:{key:inputKey,status:'active'}}, function updateCustomer(err,doc){
                    if(err){
                        return next(err);
                        }
                        Level1ConfrimationkeyDal.update({key:inputKey},{status:'used'}, function updateKey(err,doc){
                            if(err){
                                return next(err);
                            }
                            res.json({msg:"Sucess Fully SOLD",key:doc});
                        });
                    
                });
               
            });
        }else if(customerLevel === 2 || customerLevel === 3){
        Level2ConfrimationkeyDal.get({key:inputKey},{status:'inactive'}, function checkKey(err,doc){
                if(err){
                    return next(err);
                }
            //  if()
                res.json({msg:"ok level 3"});
            });
        }else if(customerLevel >=4){
            Level3ConfrimationkeyDal.get({key:inputKey},{status:'inactive'}, function checkKey(err,doc){
                if(err){
                    return next(err);
                }
                res.json({msg:"ok Level3"});
            });

        }else{
            res.json({error: true,msg:"Wrong Parameter",status:400})
        }
        workflow.emit('updateCustomer');
        });
        workflow.on('updateCustomer', function updateCustomer(){

            workflow.emit('updateCardStatus');
        });
         workflow.on('responsed', function responsed(){

          res.json({msg:"Successfully Sold"});
        });
    workflow.emit('validateInput');

};