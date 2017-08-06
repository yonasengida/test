//Add required modules here
var express = require('express');
var request = require('request');
var app = express(); 
//http://localhost:3000/_getproduct/8821264 
app.get('/_getproduct/:id', function(req, res) { 
       if (!req.params.id) { 
           res.status(500); 
           res.send({"Error": "Looks like you are not senging the product id to get the product details."}); 
           console.log("Looks like you are not senging the product id to get the product detsails."); 
       } 
      request.get({ url: "http://localhost:9200/productcatalog/product/" + req.params.id },      function(error, response, body) { 
              if (!error && response.statusCode == 200) { 
                  res.json(body); 
                 } 
             }); 
     }); 
// var HTTP_PORT  = process.env.PORT || 5000;
//      // Listen to HTTP Port
// app.listen(HTTP_PORT, function connectionListener() {
//   console.log("App is running");
//   debug('EAGLES API running on port %s', HTTP_PORT);
// });
``