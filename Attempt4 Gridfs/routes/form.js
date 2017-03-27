var express = require('express');
var router = express.Router();
var path = require('path');
// var bodyParser = require('body-parser');
var fs = require('fs');

// var multer=require('multer');
// var upload=multer({dest:path.join(__dirname,"../public/images/")});

var myGridFs=require('./gridfs');

// var myForm = require('../models/myForm');

function isEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }

    return JSON.stringify(obj) === JSON.stringify({});
}

router.get('/', function (request, response, next) {
    response.sendFile(path.join(__dirname, '../public/form.html'));
});

router.post('/files',/*upload.single('avatar'),*/function (request,response,next){
    myGridFs.writeFile(request,response);
    response.end();
});

router.get('/read/:fileTo/:file',function(request,response,next) {
    console.log('Reading File');
    myGridFs.readFile(request,response);
    response.end();
});

module.exports = router;