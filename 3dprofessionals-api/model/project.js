/*jshint esversion: 6 */
const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const projectSchema = new Schema({
  date: Date,
  starttime: String,
  description: String,
  price: Number,
  professional: { type: Schema.Types.ObjectId, ref: 'User' },
  client: { type: Schema.Types.ObjectId, ref: 'User' },
  status:{
    type: String,
    enum: ['AcceptedByProf','DeclinedByProf','SentByProf','AcceptedByClient','DeclinedByClient','SentByClient'],
    default:'SentByClient'
  }
});


const Project = mongoose.model("Project", projectSchema);
module.exports = User;
