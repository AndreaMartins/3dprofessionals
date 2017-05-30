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
    User
    .findById({_id: user})
    .populate("projects")
    .exec((err, user) => {
      if (err) {
        next(err);
        return;
      }
  res.json(user);
    });
});


router.get('/users/professionals/:professionals', (req, res, next) => {
    let role = req.params.professionals;
  User.find({"role":role},(err,users)=>{
    if (err) res.status(401).json({message:"not found"});
  else{

  res.json({users});
  }
  });
});

router.get('/users/clients/:clients', (req, res, next) => {
    let role = req.params.clients;
  User.find({"role":role},(err,users)=>{
    if (err) res.status(401).json({message:"not found"});
  else{

  res.json({users});
  }
  });
});


//Get Users
router.get('/users', (req, res, next) => {
  User.find((err,users)=>{
    if (err) res.status(401).json({message:"not found"});
  else{

  res.json({users});
  }
  });
});


//Post Edit Profile

router.post("/update/:id", upload.single("file"), (req, res, next) => {
  //this should be later router.post('/update', upload.single('profile_image'), (req, res, next) => {
  console.log("inside update", req.body);
  console.log(req.params);
  console.log(req.file)



  let userInfo;

    if (req.file === undefined) {
        userInfo = {
          name: req.body.name,
          surname: req.body.surname,
          email: req.body.email,
          password: req.body.password,
          fee: req.body.fee
        };
    } else {
        userInfo = {
          name: req.body.name,
          surname: req.body.surname,
          email: req.body.email,
          password: req.body.password,
          fee: req.body.fee,
          profilePic: 'uploads/' + req.file.filename
        };
    }




    User.findByIdAndUpdate(req.params.id, userInfo, (err, user)=>{
      if (err) {
        next(err);
      } else {
        res.json({user});
      }
    });

});


/* post a new image */
router.post('/user/photo', upload.single('file'), function(req, res) {
  console.log("heyyy");
  // console.log(req.body.id, req.file);
  let user = req.body.id;
  image = {
    profilePic: `/uploads/${req.file.filename}`
  };
console.log(user);
console.log(image);
  User.findByIdAndUpdate(user, image, {new: true},(err, user)=>{
    if (err) res.status(401).json({message:"not found"});
    else{
      console.log(user);
      res.json(user);
    }
  });

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

// route edit info profile
router.put('/user/:id',(req, res, next) => {

  const profileInfo = req.body;
  User.findByIdAndUpdate(req.params.id, profileInfo , (err, user) => {
    if (err) {return res.send(err); }
    return res.json(user);
  });


});

module.exports = router;
