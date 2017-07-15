// Load Module Dependencies
var express   =   require('express');

var key = require('../controllers/confrimationkey');

// Create a Router
var router = express.Router();

router.post('/', key.createConfrimationkey);

router.get('/', key.getConfrimationkeys);


// Export Router
module.exports = router;


 