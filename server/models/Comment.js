const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  commentId: {
    type: String,
    required: true,
    unique: true,
  },
  postId: {
    type: String,
    required: true,
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
    default: 0,
  },
  retweetsBy: {
    type: Array,
    default: [],
  },
  likes: {
    type: Number,
    default: 0,
  },
  likedBy: {
    type: Array,
    default: [],
  },
  shares: {
    type: Number,
    default: 0,
  },
  sharedBy: {
    type: Array,
    default: [],
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
module.exports = mongoose.model("Comment", commentSchema);
