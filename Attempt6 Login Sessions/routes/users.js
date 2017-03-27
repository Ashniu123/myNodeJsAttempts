var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/SimpleForm');
var Verify = require('./verify');
var path=require('path');

router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname,"../public/index.html"));
});

router.post('/register', function(req, res) {
    User.register(new User({ username : req.body.username }),
        req.body.password, function(err, user) {
            if (err) {
                return res.status(500).json({err: err});
            }else {
                passport.authenticate('local')(req, res, function () {
                    res.send("Registration Successful");
                    setTimeout(function() {
                       res.redirect('/');
                    },1000);
                });
            }
        });
});

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                err: info
            });
        }
        req.logIn(user, function(err) {
            if (err) {
                throw err;
                // return res.status(500).json({
                //     err: 'Could not log in user'
                // });
            }

            var token = Verify.getToken(user);
            req.session.username=req.body.username;
            req.session.accessToken=token;
            // console.log("Users:\n",req.session);
            setTimeout(function() {
               res.redirect('/info');
            },5000);
        });
    })(req,res,next);
});

router.get('/info',Verify.verifyUser,function(req,res) {
   res.status(200).send("Logged In<br>Here is some Info!<br>User:"+req.session.username);
});

router.get('/logout', function(req, res) {
    if(req.session.username) {
        // console.log("Logout Session Before:",req.session);
        req.session.destroy();
        // console.log("Logout Session After:",req.session);
        req.logout();
        res.status(200).send("Logged out");
    }else{
        res.status(200).send("You were never logged in!");
    }

});

module.exports = router;
