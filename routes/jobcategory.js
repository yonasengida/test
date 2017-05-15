// Load Module Dependencies
var express   =   require('express');
var jobcategory      = require('../controllers/jobcategory');

// Create a Router
var router = express.Router();
/**
 * @apiDescription This endpoint is allow to Create Job Category
 * @api {post} /jobcategories  Create JobCategory
 * @apiName CreateJobCategory
 * @apiGroup JobCategory
 *
 * @apiParam {String} name  JobCategory Name
 * 
 * @apiParamExample Request Exmaple
 * {
 *   "name":  "Economics",
 *   
 * }
 * * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 * "_id": "58af8cbd7544b94c8fa864e7",
 *  "name": "Economics",
 * }
 */
router.post('/', jobcategory.createJobCategory);
/**
 * @apiDescription This Endpoint is allow to Get All Job Catgory information.
 * @api {get} /jobcategories  Get All Job Category
 * @apiName GetJobCategories
 * @apiGroup JobCategory
 * 
 * @apiSuccessExample {json} Success-Response:
 *HTTP/1.1 200 OK
 * {
 * "_id": "58af8cbd7544b94c8fa864e7",
 *  "name": "JC1",
 * }
 * {
 * "_id": "58af8cbd7544b94c8fa864e7",
 *  "name": "JC2",
 * }
 * {
 * "_id": "58af8cbd7544b94c8fa864e7",
 *  "name": "JC3",
 * }
 * {
 * "_id": "58af8cbd7544b94c8fa864e7",
 *  "name": "JC4",
 * }
 */
router.get('/', jobcategory.getJobCategorys);

router.get('/paginate',jobcategory.getJobCategorysByPagination)

//this is to validate the id is exist or not
router.param('id', jobcategory.validate);

/**
 * @apiDescription This Endpoint is allow to get Specific Job Category
 * @api {get} /jobcategories/:id  Get Specfic Job Category
 * @apiName GetJobCategory
 * @apiGroup JobCategory
 *
 *
 * @apiParam {String} id Job Category Jd
 *
 * * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 * {
 * "_id": "58af8cbd7544b94c8fa864e7",
 *  "name": "Chelsea",
 * }
 */

router.get('/:id', jobcategory.getJobCategory);
/**
 * @api {put} /jobcategories/:id  Update Job Category
 * @apiName UpdateJobCategory
 * @apiGroup JobCategory
 *
 *
 * @apiParam {Object} Data Update Data
 * 
 * * @apiParamExample Request Exmaple
 * {
 *  "name":  "aaaaaa",
 * }
 * * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *  
 *    "_id": "58af8cbd7544b94c8fa864e7",
 *    "name": "aaaaaa",
 
 * }
 */
router.put('/:id', jobcategory.updateJobCategory);

/**
 * @api {delete} /jobcategories/:id  Delete Job Category
 * @apiName DeleteJobCategory
 * @apiGroup JobCategory
 *
 *
 * @apiParam {Object} id jobcategory Id
 *
 *@apiSuccessExample {json} Success-Response:
 *HTTP/1.1 200 OK
 * {
 * "_id": "58af8cbd7544b94c8fa864e7",
 *  "name": "Chelsea",
 
 * }
 */
router.delete('/:id', jobcategory.noop);



// Export Router
module.exports = router;


