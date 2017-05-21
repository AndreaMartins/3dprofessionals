/*jshint esversion: 6 */

var express = require('express');
var router = express.Router();
const User = require('../model/user');
const Project = require('../model/user');
const mongoose = require('mongoose');

//Get home page

router.get('/', (req, res, next) => {

  let user = req.user;

    Project.find({}, (err, projects) => {
      if (err) {
        next(err);
      } else {
        res.render('index', { user: user, projects: projects});
      }
    });
});

//Get Edit Profile

router.get('/edit-profile', (req, res, next) => {

  let user = req.user;

  res.render('editprofile', { user: user});

});

//Post Edit Profile

router.post('/edit', upload.single('profile_image'), (req, res, next) => {


  let userInfo;

    if (req.file === undefined) {
        userInfo = {
          name: req.body.name,
          surname: req.body.username,
          email: req.body.email,
          password: req.body.password,
          saldo: req.body.saldo
        };

    } else {

        userInfo = {
          name: req.body.name,
          surname: req.body.username,
          email: req.body.email,
          password: req.body.password,
          saldo: req.body.saldo,
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
