// Load Module Dependencies
var express   =   require('express');

var key = require('../controllers/confrimationkey');

// Create a Router
var router = express.Router();

router.post('/', key.createConfrimationkey);

//router.get('/', key.getConfrimationkeys);
router.get('/level1', key.getConfrimationkeyslevel3);
router.get('/level2', key.getConfrimationkeyslevel2);
router.get('/level3', key.getConfrimationkeyslevel1);


// Export Router
module.exports = router;


 