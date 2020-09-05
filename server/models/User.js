const mongoose = require("mongoose");
const Pictures = require("./Pictures");
const { loggers } = require("winston");
loggers.info("Models::", Pictures.db);
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
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pictures",
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
    type: String,
  },
  following: {
    type: Number,
    default: 0,
  },
  coverPicture: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pictures",
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
  website: {
    type: String,
    default: "",
  },
});
module.exports = mongoose.model("User", userSchema);
