// Load Module Dependencies
var express   =   require('express');

var news = require('../controllers/news');

// Create a Router
var router = express.Router();

router.post('/', news.noop);

router.get('/', news.noop);


// Export Router
module.exports = router;


