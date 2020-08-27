const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
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
  tweetsCount: {
    type: Number,
    default: 0,
  },
  country: {
    type: String,
  },
  birthdate: {
    type: Date,
  },
  following: {
    type: Number,
    default: 0,
  },
  coverPicture: {
    type: String,
  },
  bio: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  modifiedAt: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("User", userSchema);
