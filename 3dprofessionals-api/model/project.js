/*jshint esversion: 6 */
const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const projectSchema = new Schema({
  date: Date,
  starttime: String,
  description: String,
  acceptedByClient: Boolean,
  declinedByClient: Boolean,
  acceptedByProfessional: Boolean,
  declinedByProfessional: Boolean,
  price: Number,
  professional: { type: Schema.Types.ObjectId, ref: 'User' },
  client: { type: Schema.Types.ObjectId, ref: 'User' },

}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});


const Project = mongoose.model("Project", projectSchema);
module.exports = User;
