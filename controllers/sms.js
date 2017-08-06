

// Load Module Dependencies
var debug       = require('debug')('afrikik-api');
var moment      = require('moment');

// var StaffDal= require('../dal/staff');
exports.noop = function noop (req, res, next) {
  res.json({
    msg: 'To Implemented!'
  });
};

exports.sendSMS = function sendSMS(req,res,next){
    console.log(req.query.from);
    res.json({
        msg:"Send Interface is called"
    });

};
exports.recieveSMS = function recieveSMS(req,res,next){
    console.log(req.query.from);
    console.log(req.query.msg);
    console.log(req.query.to);
    if(req.query.msg === '1'){
        // save Into Database
    res.send("Thank you , you are registered on Eagles Job and Vacancy");
}
    else{
  res.send("Wrong Choice, Please send the right Choice");
    }

   // res.send("From:"+req.query.from+" "+"Message:"+req.query.msg+"  "+"To:"+req.query.to)
    
  //  send_url = "http://localhost:13131/cgi-bin/sendsms?username=eagles&password=eagles@2009ET&to="+ reg.query.from + "&text=Auto_replay_Message&from=8801";
    
    // res.json({
    //     msg:"Send Interface is called"
    // });



};

// /**
//  * Validate Staff ID
//  */
// /**
//  * @disc Staff id validation interface
//  * @param {id} unique Staff ID
//  * @param {req} http request
//  * @param {res} Http response
//  * @param {next} middlware dispatcher
//  */
// exports.validateStaff = function validateStaff(req, res, next, id) {
//   //Validate the id is mongoid or not
//   req.checkParams('id', 'Invalid param').isMongoId(id);

//   var validationErrors = req.validationErrors();

//   if (validationErrors) {

//     res.status(404).json({
//       error: true,
//       msg: "Not Found",
//       status: 404
//     });


//   } else {
//     StaffDal.get({ _id: id }, function (err, staff) {
//       if (staff._id) {
//         req.staff = staff._id;
//         next();
//       } else {
//         res.status(404)
//           .json({
//             error: true, status: 404,
//             msg: 'Staff _id ' + id + ' not found'
//           });
//       }
//     });
//   }
// };

// /**
//  * Update Staff
//  */
// exports.updateStaff = function updateStaff(req, res, next) {
//   var body = req.body;
//   // Update Staff profile
//   StaffDal.update({ _id: req.staff }, body, function update(err, staff) {
//     if (err) {
//       return next(err);
//     }

//     if (!staff) {
//       res.status(404);
//       res.json({
//         error: true,
//         msg: 'Staff To Be Updated Not Found!',
//         status: 404
//       });
//       return;

//       } else {

//         res.json(staff);
//       }
//     });
// };

// exports.getStaff = function getStaff(req, res, next) {
//   debug('fetching staff information');
//   StaffDal.get({ _id: req.staff }, function getStaff(err, staff) {
//     if(err){
//       return next(err);
//     }
//     res.json(staff);
//   });
// };
// exports.getAllStaff = function getAllStaffs(req, res, next) {
//   debug('fetching staff information');
//   console.log("fetching staff infromation");
//   StaffDal.getCollection({}, function getStaff(err, staffs) {
//     if(err){
//       return next(err);
//     }
//     res.json(staffs);
//   });
// };

// //Export By Pagination
// exports.getByPagination = function getByPagination(req, res, next) {

//  var query ={};
//  // retrieve pagination query params
//   var page   = req.query.page || 1;
//   var limit  = req.query.per_page || 1;
//  var queryOpts ={
//    page:page,
//    limit:limit
//   };

//   StaffDal.getCollectionBYPagination(query,queryOpts, function getByPaginationCb(err, doc) {
//     if (err) {
//       return next(err);
//     }
//     if (!doc) {
//       res.status(404),
//         res.json({
//           error: true,
//           msg: "Requested Data is not found",
//           status: 404
//         }
//         );
//     }
//     res.json(doc);
//   });

// };