// Load Module Dependencies
var express   =   require('express');

var staff = require('../controllers/staff');

// Create a Router
var router = express.Router();
/**
 * @apiDescription This is the Endpoint to acess all staffs inforamtion
 * @api {get} /staff Request All  Staff information
 * @apiName GetStaff
 * @apiGroup Staff
 */
router.get('/', staff.getAllStaff);
router.get('/paginate',staff.getByPagination)

/**
 * To validate param id 
 */
router.param('id',staff.validateStaff)

/**
 * @apiDescription This is the Endpoint to acess specific staff inforamtion
 * @api {get} /staff/:id Request specific  Staff information
 * @apiName GetStaff
 * @apiGroup Staff
 * @apiParam {string} _id Staff unique ID.
 * 
 */
router.get('/:id', staff.getStaff);
/**
 * @apiDescription This is the Endpoint to update specific staff inforamtion
 * @api {get} /staff/:id Update specific  Staff information
 * @apiName UpdateStaff
 * @apiGroup Staff
 *
 * @apiParam {Object} Data Update Data
 * 
 */
router.put('staff/:id', staff.updateStaff);

// DELETE /staff/:id
router.delete('staffs/:id', staff.noop);


// Export Router
module.exports = router;


