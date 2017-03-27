var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');

var myForm = require('../models/myForm');

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

router.post('/login', function (request, response, next) {
    // console.log('User: ',request.query['name']);
    console.log("File Contents:\n", request.files);
    if (isEmpty(request.files))
        return response.status(400).send('No files were uploaded.');
    else {
        // response.send('File uploaded!');
        myForm.create(request.files,request.body, function (err, entry) {
            if (err) {
                console.log(err);
                response.redirect('/');
            }
            else {
                request.files.avatar.mv(path.join(__dirname, '../public/images/' + request.files.avatar.name), function (err) {
                    if (err)
                        return response.status(500).send(err);
                    else {
                        console.log(entry);
                        response.redirect('/download');
                    }
                });
            }
        });
    }

});

router.get('/download/:file',function (request,response,next){
    var filePath = path.join(__dirname,'../public/images/');
    response.download(filePath+request.params.file);
});

router.get('/video/',function(request,response,next) {
    response.writeHead(200,{'Content-type':'video/mp4'});
    var rs=fs.createReadStream(path.join(__dirname,'../public/multimedia/video.mp4'));
    rs.pipe(response);
});

module.exports = router;