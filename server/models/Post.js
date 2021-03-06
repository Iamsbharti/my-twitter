const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Pictures = require("./Pictures");
console.log("pictures:", Pictures.db.config);
const postSchema = mongoose.Schema({
  postId: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
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
  postImage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pictures",
  },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
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
  bookMarkedBy: {
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
  hashTags: {
    type: Array,
    default: [],
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
