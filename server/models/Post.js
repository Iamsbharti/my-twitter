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
  image: {
    tyoe: String,
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
  timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
});
