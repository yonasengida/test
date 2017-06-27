// Load Module Dependencies
var express   =   require('express');

var news = require('../controllers/news');

// Create a Router
var router = express.Router();

router.post('/', news.createNews);

router.get('/', news.getNewss);


// Export Router
module.exports = router;


