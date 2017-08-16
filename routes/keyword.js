// Load Module Dependencies
var express   =   require('express');

var keyword = require('../controllers/keyword');

// Create a Router
var router = express.Router();

router.get('/', keyword.getkeywords);
router.param('id',keyword.validate);
router.get('/:id', keyword.getkeyword);

router.post('/', keyword.createkeyword);
// Export Router
module.exports = router;
 

