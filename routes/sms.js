// Load Module Dependencies
var express   =   require('express');

var sms = require('../controllers/sms');

// Create a Router
var router = express.Router();

router.get('/send', sms.sendSMS);

router.get('/recieve', sms.recieveSMS);
// Export Router
module.exports = router;
 

