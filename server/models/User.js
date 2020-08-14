const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  recoveryCode: {
    type: String,
  },
  followers: {
    type: Array,
  },
  profile: {
    type: String,
  },
  password: {
    type: String,
  },
  createdOn: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("User", userSchema);
