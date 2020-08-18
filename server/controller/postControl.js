const Post = require("../models/Post");
const User = require("../models/User");
const logger = require("../library/logger");
const { formatResponse } = require("../library/formatResponse");
const shortid = require("shortid");
const { deleteModel } = require("mongoose");
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
    .sort({ createdAt: -1 })
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
const updatePost = async (req, res) => {
  logger.error("Update a Post");

  const { postId, update } = req.body;
  console.log("update body::", postId, update);

  /**search for existing post */
  let query = { postId: postId };
  let postExists = await Post.findOne(query);
  if (!postExists) {
    return res
      .status(404)
      .json(formatResponse(true, 404, "Post Not Found", null));
  }
  /** */
  /**update the specific post */
  let { comments, retweets, likes, shares } = update;
  console.log("post--", retweets, likes, shares);
  let updateOptions = {};
  if (retweets !== undefined) {
    updateOptions = {
      ...updateOptions,
      retweets: postExists.retweets + 1,
    };
  }
  if (likes !== undefined) {
    updateOptions = {
      ...updateOptions,
      likes: postExists.likes + 1,
    };
  }
  if (shares !== undefined) {
    updateOptions = {
      ...updateOptions,
      shares: postExists.shares + 1,
    };
  }
  if (comments !== undefined) {
    updateOptions = { ...updateOptions, $push: { comments: comments } };
  }
  console.log("update options::", updateOptions);
  Post.updateOne(query, updateOptions, (error, udpatedPost) => {
    if (error) {
      res
        .status(500)
        .json(formatResponse(true, 500, "Internal Server Error", error));
    } else {
      let { n } = udpatedPost;
      res
        .status(200)
        .json(formatResponse(false, 200, "Post Updated", `${n}-doc updated`));
    }
  });
};
const deletePost = async (req, res) => {
  logger.info("Delete post control");
  let { postId } = req.query;

  /**check for postId existence */
  let postExists = await Post.findOne({ postId: postId });
  if (!postExists) {
    return res
      .status(404)
      .json(formatResponse(true, 404, "Post Not Found", null));
  }
  /**delete the post */
  Post.deleteOne({ postId: postId }, (error, deletedPost) => {
    if (error) {
      res
        .status(500)
        .json(formatResponse(true, 500, "Internal Server Error", error));
    } else {
      let { n } = deletedPost;
      res
        .status(200)
        .json(formatResponse(false, 200, "Post Deleted", `${n}-post deleted`));
    }
  });
};
module.exports = {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
};
