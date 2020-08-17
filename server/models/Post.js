const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  postId: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  userAvatar: {
    type: String,
  },
  displayName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  comments: {
    type: Array,
  },
  retweets: {
    type: Number,
  },
  likes: {
    type: Number,
  },
  shares: {
    type: Number,
  },
  verified: {
    type: Boolean,
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
module.exports = mongoose.model("Post", postSchema);