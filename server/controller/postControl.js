const Post = require("../models/Post");
const User = require("../models/User");
const logger = require("../library/logger");
const { formatResponse } = require("../library/formatResponse");
const shortid = require("shortid");
const EXCLUDE = "-__v -_id";
const verifyUser = async (userId) => {
  let userExists = await User.findOne({ userId: userId });
  return userExists
    ? Promise.resolve()
    : Promise.reject(formatResponse(true, 404, "User Not Found", userExists));
};
const createPost = async (req, res) => {
  const {
    description,
    userAvatar,
    displayName,
    userName,
    userId,
    image,
    comments,
    retweets,
    likes,
    shares,
    verified,
  } = req.body;
  const savePost = async () => {
    /**create new post schema*/
    let newPost = new Post({
      postId: shortid.generate(),
      description: description,
      userAvatar: userAvatar,
      displayName: displayName,
      userId: userId,
      userName: userName,
      image: image,
      comments: comments,
      retweets: retweets,
      likes: likes,
      shares: shares,
      verified: verified,
    });
    /**save post */

    let createdPost = await Post.create(newPost);
    if (createdPost) {
      return Promise.resolve(createdPost);
    } else {
      return Promise.reject(
        formatResponse(true, 500, "Internal DB Error", null)
      );
    }
  };
  /**verify user */
  verifyUser(userId)
    .then(savePost)
    .then((response) => {
      console.log("Post create res::", response);
      res
        .status(200)
        .json(formatResponse(false, 200, "Post Created", response));
    })
    .catch((error) => {
      logger.error("Create Post Error::", error);
      res.status(error.status).json(error);
    });
};
const getAllPosts = async (req, res) => {
  logger.info("Get All Post Control");
  /**return all available posts */
  Post.find()
    .select(EXCLUDE)
    .lean()
    .exec((error, allPosts) => {
      if (error) {
        res
          .status(500)
          .json(formatResponse(true, 500, "Internal Server Error", error));
      } else {
        res
          .status(200)
          .json(formatResponse(false, 200, "Fetched All Posts", allPosts));
      }
    });
};
module.exports = {
  createPost,
  getAllPosts,
};
