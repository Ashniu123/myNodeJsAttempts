var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var User=require('../models/SimpleForm');

router.get('/',function (request,response,next){
    response.sendfile('index.html');
});

router.post('/login',function (request,response,next) {
    console.log('User: ',request.body.username);
    User.create(request.body,function (err,user) {
       if(err){
           console.log(err);
           response.redirect('/');
       }
       else{
           response.send('inserted');
           console.log(user);
       }

    });
    //response.send('inserted');
});


module.exports = router;