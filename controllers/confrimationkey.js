// Load Module Dependencies
var event = require('events');
var debug = require('debug')('eagles-api:Controllers');;
var ConfrimationkeyDal = require('../dal/confrimationkey');

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
    var body = req.body;
    var workflow = new event.EventEmitter();

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
        //  console.log('checkCodeDuplication')
        ConfrimationkeyDal.get({ key: body.key }, function checkDup(err, doc) {
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
        debug('validate Confrimationkey Input');
      //  console.log(body.key);
        req.checkBody('key', 'Key  should not be empty!')
            .notEmpty();
        req.checkBody('level', 'Level  should not be empty!')
            .notEmpty();
        req.checkBody('due_date', 'Due Date  should not be empty!')
            .notEmpty();
        var validationErrors = req.validationErrors();

        if (validationErrors) {
            res.status(400);
            res.json(validationErrors);
        }
        else {
            workflow.emit('checkDuplication');
        }

    });

    workflow.on('checkDuplication', function checkDuplication() {

        workflow.emit('createConfrimationkey');
    });

    workflow.on('createConfrimationkey', function createConfrimationkey() {
        ConfrimationkeyDal.create(body, function createConfrimationkey(err, doc) {
            if (err) {
                return next(err);
            }
            res.status(201);
            res.json(doc);
        });

    });

// for(var i=1;i<=100;i++){
    workflow.emit('generateCode');
    // }
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