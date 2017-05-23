/*jshint esversion: 6 */

var express = require('express');
var router = express.Router();
const User = require('../model/user');
const Project = require('../model/user');
const upload = require('../config/multer');
const mongoose = require('mongoose');


//Get Profile

router.get('/profile', (req, res, next) => {

  let user = req.user;

  res.json( { user: user});

});

//Post Edit Profile

router.post('/edit', (req, res, next) => {

//this should be later router.post('/edit', upload.single('profile_image'), (req, res, next) => {

  let userInfo;

    if (req.file === undefined) {
        userInfo = {
          name: req.body.name,
          surname: req.body.username,
          email: req.body.email,
          password: req.body.password
        };

    } else {

        userInfo = {
          name: req.body.name,
          surname: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePic: 'uploads/' + req.file.filename,
    };
  }



  User.findByIdAndUpdate(req.user._id, userInfo, (err, user)=>{
    res.redirect('/');
  });
});


//Get Delete Profile

router.get('/:id/deleteprofile', (req, res, next) => {
  const id = req.params.id;
  // console.log(id);
  User.deleteOne({ _id: id }, (err) => {
    if (err) { next(err); }

    res.redirect('/login');
  });
});

module.exports = router;
