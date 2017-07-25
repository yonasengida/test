// Load Module Dependencies
var express   =   require('express');

var key = require('../controllers/confrimationkey');

// Create a Router
var router = express.Router();

router.post('/', key.createConfrimationkey);
router.post('/sell', key.sellKey);
/**
 * @apiDescription This endpoint is allow to ActivateKey
 * @api {post} /key/activate  ActivateKey
 * @apiName ActivateKey
 * @apiGroup Key
 * 
 * @apiParam {String} keyActivation Key
 * @apiParam {String} customer_id CustomerID
 * @apiParam {String} customer_level Counts of Job Category for each customer
* @apiParamExample Request Exmaple

  {
      "key":"FQRurUdDP",
      "customer_level":"1",
      "customer_id":"59469f406bc988251d5f1691"
   
    }
  
  */
router.post('/activate', key.activateKey);


router.get('/level1', key.getConfrimationkeyslevel1);
router.get('/level2', key.getConfrimationkeyslevel2);
router.get('/level3', key.getConfrimationkeyslevel3);


// Export Router
module.exports = router;


 