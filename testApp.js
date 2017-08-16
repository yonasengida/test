const express = require('express')
var passport = require('passport')
var User =     require('./models/user');
var mongoose    = require('mongoose');
var request = require('request');
var facebook = require('facebook-node-sdk');
const app = express()
var Facebook = require('facebook-node-sdk');

var facebook = new Facebook({ appID: '276820422798397', secret: 'bf2d758d472c98ee73f0a634d032e533' });

let url = "https://graph.facebook.com/v2.6/1523825674347716?fields=first_name,last_name,profile_pic&access_token=EAAFiZCeyJEkkBAFzgOKO7DLJZB1Ri2NEXqySW5wCTlLK96lEUzZBiBxlZAp6drg9NZBY4pLUeft7UPHmmx3pGyFSGEd1LjmhYTZBSP6kZCOT2AAwfuljDrKpMZA08gqVQzSxPZAZAWGCDoOGWbMZBqjwQsGrJ0Pi1P3NZCwbA7bxvhXoAp45vQYzUJxUgfDurzuNdKFN0IUOfi1NYQZDZD";
facebook.api(url, function(err, data){
    if(err){
        console.error(err);
       // res.sendStatus(502);
        res.end();
    }
    else{
        //Do some stuff with the data object
    }
});
app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})