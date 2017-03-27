var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var User=require('../models/SimpleForm');

router.get('/',function (request,response,next){
    response.sendfile('index.html');
});

router.post('/email',function(request,response,next){

});

module.exports = router;