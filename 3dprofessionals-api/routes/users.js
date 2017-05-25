/*jshint esversion: 6 */

var express = require('express');
var router = express.Router();
const User = require('../model/user');
const Project = require('../model/user');
const upload = require('../config/multer');
const mongoose = require('mongoose');


//Get Current User
router.get('/user/:id', (req, res, next) => {
  let user = req.params.id;
  User.findOne({"_id":user},(err,user)=>{
    if (err) res.status(401).json({message:"not found"});
  else{
  res.json(user);
  }
  });
});


router.get('/users/professionals/:professionals', (req, res, next) => {
    let role = req.params.professionals;
  User.find({"role":role},(err,users)=>{
    if (err) res.status(401).json({message:"not found"});
  else{
    console.log(users);
  res.json({users});
  }
  });
});

//Get Users
router.get('/users', (req, res, next) => {
  User.find((err,users)=>{
    if (err) res.status(401).json({message:"not found"});
  else{
    console.log(users);
  res.json({users});
  }
  });
});


//Post Edit Profile

router.post("/update", (req, res, next) => {
  //this should be later router.post('/update', upload.single('profile_image'), (req, res, next) => {
  console.log("inside update", req.body);



  let userInfo;

    if (req.file === undefined) {
        userInfo = {
          name: req.body.name,
          surname: req.body.surname,
          email: req.body.email,
          password: req.body.password
        };

    } else {
        userInfo = {
          name: req.body.name,
          surname: req.body.surname,
          email: req.body.email,
          password: req.body.password,
          profilePic: 'uploads/' + req.file.filename
        };
    }

    var userId = req.body._id.toString();
    userId = mongoose.Types.ObjectId(userId);
    console.log("this is user ID server" ,userId);

    User.findByIdAndUpdate(userId, userInfo, (err, user)=>{
      if (err) {
        console.log("GOT AN ERROR");
        next(err);
      } else {

        console.log("GOT UPDATED", user);
        res.json({user});
      }
    });
  // User.findByIdAndUpdate(req.user._id, userInfo, (err, user)=>{
  //   console.log("sad")
  //
  // });
});


//Get Delete Profile

router.get('/:id/deleteprofile', (req, res, next) => {
  const id = req.params.id;
  // console.log(id);
  User.deleteOne({ _id: id }, (err) => {
    if (err) { next(err); }

    res.redirect('/home');
  });
});

module.exports = router;
