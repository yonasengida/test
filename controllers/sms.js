// Load Module Dependencies
var debug       = require('debug')('eagles-api');
var moment      = require('moment');
var SMSCustomerDal = require('../dal/smscustomer');
var IndexDal = require('../dal/registerindex');
var KeyWordDal = require('../dal/keyword');
var async= require('async');
var fs= require('fs');

var events = require('events');
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
exports.recieveSMS = function recieveSMS(req, res, next) {

    debug('Receiving Message');
    var txtMsg = req.query.msg;
    var txtFrom = req.query.from;
    var txtTo = req.query.to;
    var ss = txtMsg.split("*");
              
        KeyWordDal.get({keyword:ss[0],category:'job_category'}, function checkKeyword(err,doc){
            if(err){
                return next(err);
            }
            if(doc._id){
                 KeyWordDal.get({keyword:ss[1],category:'level'}, function checkLevel(err,doc){
                     if(doc._id){
                         KeyWordDal.get({keyword:ss[2],category:'exp'}, function checkExp(err,doc){
                             if(doc._id){
                               
                                SMSCustomerDal.create({mobile:txtFrom,job_category:ss[0],level:ss[1],exprience:ss[2]}, function createCust(err,data){
                                    if(err){
                                        return next(err);
                                    }
                                    res.send(data);
                                });
                                 return;
                             }else{
                                  res.send("Please Send The right Pattern</br>");
                             }
                         });
                         return;
                     }else{
                          res.send("Please Send The right Pattern</br>");
                     }
                 });
                 return;
            }else{
                res.send("Please Send The right Pattern</br>");
            }

        });           
//     var workflow = new events.EventEmitter();

//     workflow.on('checkCustomerExistence', function checkCust() {
//         IndexDal.get({ mobile: txtFrom }, function checkC(err, doc) {

//             if (doc._id) {
//                 if (doc.value === 0) {
//                     res.send("cusomer is On progress");
//                     return;
//                 } else {

//                     var ss = txtMsg.split("*");
//                    console.log(ss[0]);
//                    console.log(ss[1]);
//                    console.log(ss[2]);

//                 //   //  console.log(ss.length);
//                 //     async.each(ss, function (keyword, callback) {
//                 //         KeyWordDal.get({ keyword: keyword }, function checkKeyword(err, data) {
//                 //             if (err) {
//                 //                 return next(err);
//                 //             }
//                 //             if (!data._id) {
//                 //                 return callback('Please Send The right Keyword</br> Job*Level* exprience');
//                 //             }else{
//                 //                  return callback(null,'Sucess')
//                 //             }

//                 //         });
//                 //     }, function (err, data) {
//                 //         if (err) {

//                 //             res.send(err);
//                 //             return;
//                 //         }else{
//                 //           //  res.send("Sucess"+ss.length)
//                 //             if(ss.length !=3 ){
//                 //                 res.send("plese Send The right pattern ");

//                 //             }else{
//                 //                 console.log(ss[0]);
//                 //                 console.log(ss[1]);
//                 //                 console.log(ss[2]);
//                 //             }
//                 //         }
//                 //     });
//                 //     //console.log(garbagekeyword);
//                 //     return;
//                 }

//             } else {
//                 workflow.emit('createIndex');
//                 return;
//             }
//         });
//     });

//   workflow.on('checkKeyword', function checkKeyword() {
//      // res.send("Check Keyword Step 1");
//     KeyWordDal.get({keyword:txtMsg}, function getKey(err,doc){
       
//     });       
     
//   });
//   workflow.on('createIndex', function createIndex(index) {
//       IndexDal.create({mobile:txtFrom,value:0}, function createIndex(err,doc){
//           if(err){
//               return next(err);
//           }
//           res.send("Please Choose Job Category</br> ACC: Acounting</br>COMP:Computer Related");
//       });
//   });

//     workflow.on('updateIndex', function updateIndex(val,msg) {
//        res.send(txtFrom)
//        IndexDal.update({ mobile: txtFrom }, { value: val }, function createIndex(err, indexdoc) {
//            if (err) {
//                return next(err);
//            }
//            if(indexdoc._id){
//              res.send(msg);
//            }
          
//        });
//   });

//  workflow.emit('checkCustomerExistence');



};

