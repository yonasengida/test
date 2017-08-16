// Load Module Dependencies
var express   =   require('express');

var registerindex = require('../controllers/registerindex');

// Create a Router
var router = express.Router();

router.get('/', registerindex.getregisterindexs);

router.post('/', registerindex.createregisterindex);
// Export Router
module.exports = router;
 

