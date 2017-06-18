// Load Module Dependencies
var express   =   require('express');

var customer = require('../controllers/customer');

// Create a Router
var router = express.Router();
/**
 * @apiDescription This endpoint is allow to Add Job Category
 * @api {post} /customers/category  Add Jobcategory
 * @apiName AddJobCategory
 * @apiGroup Customer
 *
 *
 * @apiParam {String} customerId Customer Id
 * @apiParam {String} job_category Job Category
 *
 @apiParamExample Request Exmaple
 * {
 * 
 * 	"job_category":"5919d43e0971ba43eeeaced3",
 *	"customerId":"5919d82e0971ba43eeeaced9",
 * } 
 *    
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *       "_id": "5919d82e0971ba43eeeaced9",
 *       "job_category": [
 *           "5919d43e0971ba43eeeaced3"
 *       ]
 * }
 */
router.post('/category', customer.addJobCategory);
/**
 * @apiDescription This endpoint is allow to Get all customers
 * @api {get} /customers  Get all Customer
 * @apiName GetCustomers
 * @apiGroup Customer
 *
 * @apiParam {String} id Customer id
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 * 
 *        "_id": "58af8cbd7544b94c8fa864e7",
 *        "first_name": "Chelsea",
 *        "last_name": " The Blues",
 *        "user_name": "StandfordBridge",
 *        "email": "Daniel",
 *        "date_of_birth": "1970-01-01T00:00:01.916Z",
 *        "follower": [],
 *        "country": "England",
 *        "city": "london",
 *        "bio": "this is test bio abou anyone",
 * }
 * {
 * 
 *        "_id": "58af8cbd7544b94c8fa864e7",
 *        "first_name": "Chelsea",
 *        "last_name": " The Blues",
 *        "user_name": "StandfordBridge",
 *        "email": "Daniel",
 *        "date_of_birth": "1970-01-01T00:00:01.916Z",
 *        "follower": [],
 *        "country": "England",
 *        "city": "london",
 *        "bio": "this is test bio abou anyone",
 * }
 */
router.get('/', customer.getCustomers);
router.get('/paginate',customer.getCustomersByPagination)

router.param('id', customer.validate)
/**
 * @apiDescription This Endpoint is allow to get specific customer
 * @api {get} /customers/:id  Get Specfic customer
 * @apiName GetCustomer
 * @apiGroup Customer
 *
 *
 * @apiParam {String} id Customer id
 *
 * * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 * 
 *        "_id": "58af8cbd7544b94c8fa864e7",
 *        "first_name": "Chelsea",
 *        "last_name": " The Blues",
 *        "user_name": "StandfordBridge",
 *        "email": "Daniel",
 *        "date_of_birth": "1970-01-01T00:00:01.916Z",
 *        "follower": [],
 *        "country": "England",
 *        "city": "london",
 *        "bio": "this is test bio abou anyone",
 * }
 */
router.get('/:id', customer.getCustomer);

/**
 * @apiDescription This endpoint is allow to update specific customer information.
 * @api {put} /customers/:id  Update Specfic customer
 * @apiName UpdateCustomer
 * @apiGroup Customer
 *
 *
 * @apiParam {Object} Data Update Data
 *
 * * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 * 
 *        "_id": "58af8cbd7544b94c8fa864e7",
 *        "first_name": "Chelsea",
 *        "last_name": " The Blues",
 *        "user_name": "StandfordBridge",
 *        "email": "Daniel",
 *        "date_of_birth": "1970-01-01T00:00:01.916Z",
 *        "follower": [],
 *        "country": "England",
 *        "city": "london",
 *        "bio": "this is test bio abou anyone",
 * }
 */

router.put('/:id', customer.noop);

// DELETE /customers/:id
router.delete('/:id', customer.noop);
// Export Router
module.exports = router;


