/*jshint esversion: 6 */

const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  surname: String,
  email: String,
  password: String,
  profilePic: {
    type: String, default: '/icons/profiletest1.jpg'
  },
  role: {
     type: String,
     enum : ['CLIENT', 'PROFESSIONAL'],
     default : 'CLIENT'
   },
  saldo: Number,
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
  });

const User = mongoose.model("User", userSchema);
module.exports = User;
