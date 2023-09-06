const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  userName: {
    type: String,
  },
  emailId: {
    type: String,
  },
  password: { type: String, require: true },
  role: { type: String },
});
module.exports = mongoose.model("User", userSchema);
