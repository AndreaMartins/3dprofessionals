/*jshint esversion: 6 */


var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var jwtOptions = require('../config/jwtOptions');

const upload = require('../config/multer');

// Our user model
const User           = require("../model/user");

// Bcrypt let us encrypt passwords
const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;


router.post("/login", function(req, res) {
  if(req.body.email && req.body.password){
    var email = req.body.email;
    var password = req.body.password;
  }

  if (req.body.email === "" || req.body.password === "") {
    res.json({message:"fill up the fields"});
    return;
  }

  User.findOne({ "email": email }, (err, user)=> {

  	if( ! user ){
	    res.status(401).json({message:"no such user found"});
	  } else {
      bcrypt.compare(password, user.password, function(err, isMatch) {
        if (!isMatch) {
          res.status(401).json({message:"passwords did not match"});
        } else {
          var payload = {id: user._id/*, user: user.email*/};
          var token = jwt.sign(payload, jwtOptions.secretOrKey);
          res.json({message: "ok", token: token, user: user});
        }
      });
    }
  });
});

router.post("/signup", (req, res, next) => {
  var name = req.body.name;
  var surname = req.body.surname;
  var email = req.body.email;
  var password = req.body.password;
  var role = req.body.role;

  if (!email || !password) {
    res.status(400).json({ message: "Provide email and password" });
    return;
  }

  User.findOne({ email }, "email", (err, user) => {
    if (user !== null) {
      res.status(400).json({ message: 'email exists' });
        return;
    }

    var salt     = bcrypt.genSaltSync(bcryptSalt);
    var hashPass = bcrypt.hashSync(password, salt);

    var newUser = User({
      name,
      surname,
      email,
      role,
      password: hashPass
    });

    newUser.save((err, user) => {
      if (err) {
        res.status(400).json({ message: err });
      } else {
        var payload = {id: user._id};

        var token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.status(200).json({message: "ok", token: token , user: user});
      }
    });
  });
});





module.exports = router;
