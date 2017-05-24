const projects = express.Router();
const express = require('express');
const passport = require("../config/passport");
const multer = require('multer');
var router = express.Router();
var jwt = require('jsonwebtoken');
var jwtOptions = require('../config/jwtOptions');
const upload = require('../config/multer');

const Project  = require("../models/project");
const User = require("../model/user");


// const auth = require("../helpers/auth");
// const flash    = require("connect-flash");
// const upload = multer({ dest: 'public/uploads/' });



//public information of all items
projects.get("/",(req, res, next)=>{
  Project.find({},(err,projects) => {
    if (err) {
      next(err);
    } else {
      // res.render('project/showprojects',{projects});
    }
  });
});

projects.get("/new", (req, res, next)=> {
  // res.render('project/new');
});

// projects.post("/new", upload.single('photo'), (req, res, next)=> {
//   pic = new Picture({
//     image: `/uploads/${req.file.filename}`,
//     pic_name: req.file.originalname
//   });
//
//   pic.save((err) => {
//
//   });
//
//   const projectInfo = {
//     title: req.body.title,
//     description: req.body.description,
//     type: req.body.type,
//     keywords: req.body.keywords.split(' '),
//     images: [pic],
//     approxAge: req.body.approxAge,
//     userId: req.user._id
//   };
//
//   const newProject = new Project(projectInfo);
//
//   newProject.save((err, item)=>{
//         if (err) { next(err); } else {
//           User.find({_id: req.user._id}, (err, user)=> {
//             if(err) console.log("Something wrong when updating data!");
//             if(user[0].role == "User") user[0].role = "Owner";
//             user[0].itemsUser.push(newItem._id);
//             user[0].save();
//             console.log(user[0]);
//           });
//           res.redirect(`/items/${item._id}`);
//         }
//       });
//
//
// });
//
// //public information of one item
// projects.get("/:id",(req, res, next)=>{
//   Item.findById(req.params.id, (err,item)=> {
//     if (err) { next(err); }
//
//     res.render('item/showitem',{item: item});
//   });
// });
//
// //Item edited by user
// projects.post("/:id", auth.checkLoggedIn("/logout"), (req, res, next)=> {
//     const itemInfo = {
//       title: req.body.title,
//       description: req.body.description,
//       keywords: req.body.keywords.split(' '),
//       approxAge: req.body.approxAge,
//
//     };
//
//       Item.findByIdAndUpdate(req.params.id, itemInfo, (err, item) => {
//         if (err) next(err);
//         console.log("change saved");
//     });
//
//
//     res.redirect(`/items/${req.params.id}`);
//   });
//
// // check if is the user or admin gets the right to go to edit page
// projects.get("/:id/edit", auth.checkLoggedIn("/logout"), (req, res, next)=> {
//
//
//   Item.find({"_id": req.params.id}, (err, item)=> {
//     if(err) next(err);
//       console.log(req.user.id);
//         console.log(item[0].userId);
//
//     if(req.user._id == String(item[0].userId) || req.user.role == "Admin") res.render("auth/edit-item", {item: item[0]});
//     else res.redirect("/logout");
//   });
// });
//
//
// //Item deleted by user
// projects.post('/:id/delete', auth.checkLoggedIn("/logout"),(req, res, next) => {
//     const id = req.params.id;
//
//     Item.findByIdAndRemove(id, (err, item) => {
//       if (err){ return next(err); }
//       return res.redirect('/items');
//     });
//   });
//
//
// projects.post("/:id/evaluated", auth.checkLoggedIn("/logout"), (req, res, next)=>{
//   console.log(req.body);
//   console.log(req.user._id);
//   Expert.find({userId: req.user._id}, (err, experts)=>{
//     if(err) next(err);
//     let index = experts[0].pending.indexOf(req.params.id);
//     experts[0].pending.splice(index, 1);
//     experts[0].completed.push(req.params.id);
//     console.log(experts[0]);
//     experts[0].save();
//
//   });
//   const status = req.body.options ? "Evaluated" : "Rejected";
//   const itemStatus = {
//     status,
//   };
//     Item.findByIdAndUpdate(req.params.id, itemStatus, {new: true}, (err, item) => {
//       if (err) next(err);
//       console.log(item);
//   });
//   const feedbackInfo = {
//     comments: req.body.feedback,
//     estimatedValue: Number(req.body.evaluation),
//     userId: req.user._id,
//     itemId: req.params.id,
//   };
//
//   const feedback = Feedback(feedbackInfo);
//   feedback.save();
//   res.redirect("/dashboard");
// });
//
// projects.get("/:id/requesteval", auth.checkLoggedIn("/logout"), (req, res, next)=>{
//
//   console.log(req.params.id);
//    let expertId;
//   for(let query in req.query){
//     expertId = query;
//   }
//   const itemStatus = {
//     status: "Pending",
//   };
//   console.log(typeof(expertId));
//   if(expertId){
//     Item.findByIdAndUpdate(req.params.id, itemStatus, {new: true}, (err, item) => {
//       if (err) next(err);
//       console.log(item);
//
//   });
//       Expert.find({userId: expertId}, (err, experts)=>{
//         if(err) next(err);
//         experts[0].pending.push(req.params.id);
//         console.log(experts[0]);
//         experts[0].save();
//       });
//   }
//
//   res.redirect("/dashboard");
// });
//
// //Item evaluation deleted by user
// projects.post('/:id/delete', auth.checkLoggedIn("/logout"), (req, res, next) => {
//     const feedback = req.params.feedback;
//     Item.findByIdAndRemove(Feedback, (err, item) => {
//       if (err){ return next(err); }
//       return res.redirect('/items');
//     });
//   });



module.exports = projects;
