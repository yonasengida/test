// Load Module Dependencies
var express   =   require('express');

var profile = require('../controllers/profile');

// Create a Router
var router = express.Router();
// POST /profiles/new
router.post('/new', profile.noop);

//router.param('id', profile.validateProfile);

/**
 * @apiDescription This is the Endpoint to acess all profile  inforamtion
 * @api {get} /profiles Get All Profiles 
 * @apiName GetProfiles
 * @apiGroup Profile
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *      [ {
 *          "_id": "58aa8e7e2001553674b9eb3c",
            "first_name": "Samuel Etto",
            "last_name": "Didder",
            "email": "",
            "date_of_birth": "1978-03-10T21:00:00.000Z",
            "city": "Douala ",
            "country": "Cameroon",
            "gender": "Male",
            "bio": "Samuel Eto'o Fils (French pronunciationHe was third in the FIFA.",
            "last_modified": "2017-02-20T06:36:46.322Z",
            "date_created": "2017-02-20T06:36:46.275Z",
            "player": "58aa8e7e2001553674b9eb3d"
          }
          {
 *          "_id": "58aa8e7e2001553674b9eb3c",
            "first_name": "Samuel Etto",
            "last_name": "Didder",
            "email": "",
            "date_of_birth": "1978-03-10T21:00:00.000Z",
            "city": "Douala ",
            "country": "Cameroon",
            "gender": "Male",
            "bio": "Samuel Eto'o Fils (French pronunciationHe was third in the FIFA.",
            "last_modified": "2017-02-20T06:36:46.322Z",
            "date_created": "2017-02-20T06:36:46.275Z",
            "player": "58aa8e7e2001553674b9eb3d"
          }
           *       {
 *          "_id": "58aa8e7e2001553674b9eb3c",
            "first_name": "Samuel Etto",
            "last_name": "Didder",
            "email": "",
            "date_of_birth": "1978-03-10T21:00:00.000Z",
            "city": "Douala ",
            "country": "Cameroon",
            "gender": "Male",
            "bio": "Samuel Eto'o Fils (French pronunciationHe was third in the FIFA.",
            "last_modified": "2017-02-20T06:36:46.322Z",
            "date_created": "2017-02-20T06:36:46.275Z",
            "player": "58aa8e7e2001553674b9eb3d"
          }]
          
 */
router.get('/', profile.getProfiles);

router.get('/paginate',profile.getByPagination)

//this is to validate the id is exist or not
router.param('id',profile.validateProfile);
/**
 * @apiDescription This Endpointis to acess all profile of staff or customer
 * @api {get} /profiles/:id  Get Profile
 * @apiName GetProfile
 * @apiGroup Profile
 * 
 * @apiParam {String} id Profile Id
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *          "_id": "58aa8e7e2001553674b9eb3c",
            "first_name": "Samuel Etto",
            "last_name": "Didder",
            "email": "",
            "date_of_birth": "1978-03-10T21:00:00.000Z",
            "city": "Douala ",
            "country": "Cameroon",
            "gender": "Male",
            "bio": "Samuel Eto'o Fils (French pronunciationHe was third in the FIFA.",
            "last_modified": "2017-02-20T06:36:46.322Z",
            "date_created": "2017-02-20T06:36:46.275Z",
            "player": "58aa8e7e2001553674b9eb3d"
          }
         
          
 */
router.get('/:id', profile.getProfile);

/**
 * @apiDescription This  Endpoint is to update staff or customer  profile 
 * @api {put} /profiles/:id  Update Profile
 * @apiName UpdateProfile
 * @apiGroup Profile
 * 
 * @apiParam {Object} Data Update Data
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *          "_id": "58aa8e7e2001553674b9eb3c",
            "first_name": "Samuel Etto",
            "last_name": "Didder",
            "email": "",
            "date_of_birth": "1978-03-10T21:00:00.000Z",
            "city": "Douala ",
            "country": "Cameroon",
            "gender": "Male",
            "bio": "Samuel Eto'o Fils (French pronunciationHe was third in the FIFA.",
            "last_modified": "2017-02-20T06:36:46.322Z",
            "date_created": "2017-02-20T06:36:46.275Z",
            "player": "58aa8e7e2001553674b9eb3d"
          }
         
          
 */
router.put('/:id', profile.updateProfile);

// DELETE /profiles/:id
router.delete('/:id', profile.noop);

// Export Router
module.exports = router;


