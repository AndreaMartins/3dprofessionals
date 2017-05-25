
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
  Project.find({_id:project},(err,projects)=>{
    if (err) res.status(401).json({message:"not found"});
  else{
  res.status(200).json(projects[0]);
  }
  });
});



router.post('/project', (req, res, next) => {
console.log(req.body);
const newProject= Project({
  name: req.body.name,
  link: req.body.link,
  professional: req.body.professional,
  description:req.body.description,
  considerations:req.body.considerations
})
newProject.save((err,project)=>{
  if (err) res.status(400).json({messsage: err});
  else{
    console.log(project);
    res.status(200).json(project)
  }
})

// newProject = {
//   name: '',
//   link: '',
//   professional: '',
//   description: '',
//   considerations:''
// };

// const projectSchema = new Schema({
//   name: String,
//   link: String,
//   starttime: String,
//   description: String,
//   considerations: String,
//   price: Number,
//   date: Date,
//   professional: { type: Schema.Types.ObjectId, ref: 'User' },
//   client: { type: Schema.Types.ObjectId, ref: 'User' },
//   status:{
//     type: String,
//     enum: ['AcceptedByProf','DeclinedByProf','SentByProf','AcceptedByClient','DeclinedByClient','SentByClient'],
//     default:'SentByClient'
//   }
// });

//this should be later router.post('/edit', upload.single('profile_image'), (req, res, next) => {

  // let projectInfo;
  //
  //   if (req.file === undefined) {
  //       projectInfo = {
  //         name: req.body.name,
  //         link: req.body.link,
  //         professional: req.body.professional,
  //         description: req.body.description,
  //         considerations: req.body.considerations,
  //       };
  //
  //   } else {
  //
  //       projectInfo = {
  //         name: req.body.name,
  //         link: req.body.link,
  //         professional: req.body.professional,
  //         description: req.body.description,
  //         considerations: req.body.considerations,
  //   };
  // }
  //
  // Project.save(req.project._id, projectInfo, (err, user)=>{
  //   res.redirect('/');

  // });
});




module.exports = router;
