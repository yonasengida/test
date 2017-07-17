// Load Module Dependencies
var express   =   require('express');

var key = require('../controllers/confrimationkey');

// Create a Router
var router = express.Router();

router.post('/', key.createConfrimationkey);
router.post('/sell', key.sellKey);
router.post('/activate', key.activateKey);


router.get('/level1', key.getConfrimationkeyslevel1);
router.get('/level2', key.getConfrimationkeyslevel2);
router.get('/level3', key.getConfrimationkeyslevel3);


// Export Router
module.exports = router;


 