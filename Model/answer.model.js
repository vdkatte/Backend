const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const answerSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  option: { type: String },
  mark: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  category: {
    type: String,
  },
  activeStatus: {
    type: Boolean,
    default: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Answer", answerSchema);
