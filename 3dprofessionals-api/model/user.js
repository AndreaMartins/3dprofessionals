/*jshint esversion: 6 */

const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  surname: String,
  email: String,
  password: String,
  portfolio: String,
  fee: {
     type: Number,
     default : 0
   },
  profilePic: {
    type: String, default: ''
  },
  role: {
     type: String,
     enum : ['CLIENT', 'PROFESSIONAL'],
     default : 'CLIENT'
   },
   projects: [{ type: Schema.Types.ObjectId, ref: 'Project' },
],

  });

const User = mongoose.model("User", userSchema);

module.exports = User;
