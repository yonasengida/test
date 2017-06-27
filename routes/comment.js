// Load Module Dependencies
var express   =   require('express');

var comment = require('../controllers/comment');

// Create a Router
var router = express.Router();

router.post('/', comment.createComment);

router.get('/', comment.getComments);


// Export Router
module.exports = router;


