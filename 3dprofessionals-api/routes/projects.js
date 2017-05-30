
const express = require('express');
const passport = require("../config/passport");
const multer = require('multer');
var router = express.Router();
var jwt = require('jsonwebtoken');
var jwtOptions = require('../config/jwtOptions');
const upload = require('../config/multer');

const Project  = require("../model/project");
const User = require("../model/user");



// const auth = require("../helpers/auth");
// const flash    = require("connect-flash");
// const upload = multer({ dest: 'public/uploads/' });

//public information of all items
router.get("/",(req, res, next)=>{
  Project.find({},(err,projects) => {
    if (err) {
      next(err);
    } else {
      // res.render('project/showprojects',{projects});
    }
  });
});


//Get project
router.get('/project/:id', (req, res, next) => {
  let project = req.params.id;

  Project.findById({_id:project},(err,project)=>{
    if (err) res.status(401).json({message:"not found"});
    else{
      Project
      .findById({_id: project._id})
      .populate("client")
      .populate("professional")
      .exec((err, project) => {
        if (err) {
          next(err);
          return;
        }
        return res.json(project);
      });

    }
  });
});

/* post a new image */
router.post('/project/:id', upload.single('file'), function(req, res) {
  let project = req.params.id;
  image = {
    image: `/uploads/${req.file.filename}`
  };

  Project.findByIdAndUpdate(project, image, (err,project)=>{
    if (err) res.status(401).json({message:"not found"});
    else{
      res.json(project)
    }
  });

});

router.post('/project', (req, res, next) => {
const newProject= Project({
    name: req.body.name,
    link: req.body.link,
    professional: req.body.professional,
    description:req.body.description,
    considerations:req.body.considerations,
    client:req.body.client,
    changeDescription: req.body.changeDescription
});

newProject.save((err,project)=>{
  if (err) res.status(400).json({messsage: err});
  else{
    User.findByIdAndUpdate({_id: project.client},{$push: { projects: project.id,}}, (err) => {
        if (err) res.status(401).json({message:"not found"});
        else{
        User.findByIdAndUpdate({_id: project.professional},{$push: { projects: project.id,}}, (err) => {
            if (err) res.status(401).json({message:"not found"});
            else{
              res.status(200).json(project)
                }
        });
        }
    });
  }
});
});




module.exports = router;
