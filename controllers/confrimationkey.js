// Load Module Dependencies
var event = require('events');
var debug = require('debug')('eagles-api:Controllers');
var moment = require('moment');

var Level1ConfrimationkeyDal = require('../dal/level1confrimationkey');
var Level2ConfrimationkeyDal = require('../dal/level2confrimationkey');
var Level3ConfrimationkeyDal = require('../dal/level3confrimationkey');


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
exports.getConfrimationkeys = function getConfrimationkeys(req, res, next) {
    ConfrimationkeyDal.getCollection({}, function getAllConfrimationkeys(err, docs) {
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
 * 1. Check Card status with corresponding Level
 * 2.if Satus is acive u can sell
 */
exports.sellKey = function sellKey(req, res, next){

    var body = req.body;
    var workflow = new event.EventEmitter();
    var customerID = body.customer;
    var key        = body.key;

};

/**
 * This interface to activate cards only for mobile users
 */

exports.activateKey = function activateKey(req, res, next){

};