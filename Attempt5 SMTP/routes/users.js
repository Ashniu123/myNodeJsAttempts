var express = require('express');
var router = express.Router();
var nodemailer=require('nodemailer');

router.get('/',function (request,response,next){
    response.sendfile('index.html');
});

router.post('/email',function(request,response,next){

    var transporter=nodemailer.createTransport({
        service:'Gmail',
        auth:{
            user: "Your Email_id here",
            pass:'Your password here'
        }
    });

    var mailOptions={
        from: '"Fred Foo" <foo@blurdybloop.com>', // sender address
        to: request.body.email, // list of receivers
        subject: 'Hello', // Subject line
        text:'Hello world ? Testing 1 2 3...',
        html: '<b>Hello world ?</b> Testing <em>1 2 3...</em>' // html body
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) console.log(error);
        else{
            console.log('Message %s sent: %s', info.messageId, info.response);
            response.end('Email sent');
        }
    });

});
    

module.exports = router;