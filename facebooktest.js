const express = require('express')
var passport = require('passport')
var User =     require('./models/user');
var mongoose    = require('mongoose');
var facebook = require('facebook-node-sdk');
const app = express()
var FB = require('fb');

// FB.api('oauth/access_token', {
//     client_id: '276820422798397',
//     client_secret: 'bf2d758d472c98ee73f0a634d032e533',
//     grant_type: 'client_credentials'
// }, function (res) {
//     if(!res || res.error) {
//         console.log(!res ? 'error occurred' : res.error);
//         return;
//     }
    
//     var accessToken = res.access_token;
//     console.log(accessToken);
// });
FB.api('oauth/access_token', {
    client_id: '390317711364681',
    client_secret: 'a04d8f0d28fb958cf6b07f5ef8a633f4',
    grant_type: 'fb_exchange_token',
    fb_exchange_token: 'EAAFiZCeyJEkkBAFzgOKO7DLJZB1Ri2NEXqySW5wCTlLK96lEUzZBiBxlZAp6drg9NZBY4pLUeft7UPHmmx3pGyFSGEd1LjmhYTZBSP6kZCOT2AAwfuljDrKpMZA08gqVQzSxPZAZAWGCDoOGWbMZBqjwQsGrJ0Pi1P3NZCwbA7bxvhXoAp45vQYzUJxUgfDurzuNdKFN0IUOfi1NYQZDZD'
}, function (res) {
    if(!res || res.error) {
        console.log(!res ? 'error occurred' : res.error);
        return;
    }
    
    // var accessToken = res.access_token;
    // var expires = res.expires ? res.expires : 0;
    console.log(res);
    // //console.log("hello")
    if(res.access_token){
            //     FB.setAccessToken(res.access_token);

            // FB.api('me', { q : {
            // id: 'SELECT uid FROM user WHERE uid=me()',
            // name: 'SELECT name FROM user WHERE uid IN (SELECT uid FROM #id)'
            // } }, function(res) {
            // if(!res || res.error) {
            //     console.log(!res ? 'error occurred' : res.error);
            //     return;
            // }
            // console.log(res);
           
            // });
        
    }
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
});