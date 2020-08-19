const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");
const logger = require("../library/logger");
const { formatResponse } = require("../library/formatResponse");
const shortid = require("shortid");
const { object } = require("@hapi/joi");
const EXCLUDE = "-__v -_id";
const verifyUser = async (userId) => {
  let userExists = await User.findOne({ userId: userId });
  return userExists
    ? Promise.resolve()
    : Promise.reject(formatResponse(true, 404, "User Not Found", userExists));
};
const verifyPost = async (postId) => {
  let postExists = await Post.findOne({ postId: postId });
  return postExists
    ? postExists
    : formatResponse(true, 404, "Post Not Found", postExists);
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
      logger.info(`Post Created::${response.postId}`);
      res
        .status(200)
        .json(formatResponse(false, 200, "Post Created", response));
    })
    .catch((error) => {
      logger.error(`Create Post Error:: ${error}`);
      res.status(error.status).json(error);
    });
};
const getAllPosts = async (req, res) => {
  logger.info("Get All Post Control");
  /**
   * db.orders.aggregate([
   {
     $lookup:
       {
         from: "inventory",
         localField: "item",
         foreignField: "sku",
         as: "inventory_docs"
       }
  }
])
   */
  Post.aggregate(
    [
      {
        $lookup: {
          from: "comment",
          localField: "comments",
          foreignField: "_id",
          as: "commentsObj",
        },
      },
    ],
    (error, posts) => {
      //console.log("error,posts::", error, posts);
    }
  );
  /**return all available posts with populating the comments */
  Post.find()
    .populate("comments")
    .exec(function (err, posts) {
      if (err) {
        res
          .status(500)
          .json(formatResponse(true, 500, "Internal Server Error", err));
      }
      console.log("posts::", typeof posts[0]["comments"]);
      res
        .status(200)
        .json(formatResponse(false, 200, "Fetched All Posts", posts));
    });
};
const updatePost = async (req, res) => {
  logger.error("Update a Post");
  const { postId, update } = req.body;
  /**search for existing post */
  let query = { postId: postId };
  let isPostValid = await verifyPost(postId);
  if (isPostValid.error) {
    return res.status(isPostValid.status).json(isPostValid);
  }
  /** */
  /**update the specific post */
  let { comments, retweets, likes, shares } = update;
  let updateOptions = {};
  if (retweets !== undefined) {
    updateOptions = {
      ...updateOptions,
      retweets: isPostValid.retweets + 1,
    };
  }
  if (likes !== undefined) {
    updateOptions = {
      ...updateOptions,
      likes: isPostValid.likes + 1,
    };
  }
  if (shares !== undefined) {
    updateOptions = {
      ...updateOptions,
      shares: isPostValid.shares + 1,
    };
  }
  if (comments !== undefined) {
    updateOptions = { ...updateOptions, $push: { comments: comments } };
  }
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

  /**search for existing post */
  let isPostValid = await verifyPost(postId);
  if (isPostValid.error) {
    return res.status(isPostValid.status).json(isPostValid);
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
const addComment = async (req, res) => {
  logger.info("Add Comment Control");
  const {
    postId,
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
  /**search for existing post */
  let isPostValid = await verifyPost(postId);
  if (isPostValid.error) {
    return res.status(isPostValid.status).json(isPostValid);
  }
  /**verify userId */
  let isUserValid = await User.findOne({ userId: userId });
  if (!isUserValid) {
    return res
      .status(404)
      .json(formatResponse(true, 404, "User Not Found", null));
  }
  /**create schema for new comment */
  let newComment = new Comment({
    commentId: shortid.generate(),
    postId: postId,
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
  /**save comment */
  let savedComment = await Comment.create(newComment);
  console.log("comments added::", savedComment);
  let flagSucessCommentPost = false;
  if (savedComment) {
    let comment_unique_Id = savedComment._id;
    console.log("comment id::", comment_unique_Id);
    /**update the post for which this comment was posted */
    let updateOptions = { $push: { comments: comment_unique_Id } };
    console.log("update options::", updateOptions);
    let updatedPost = await Post.updateOne({ postId: postId }, updateOptions);
    console.log("updated posts::", updatedPost);
    if (!updatedPost) {
      flagSucessCommentPost = true;
    }
  } else {
    flagSucessCommentPost = true;
  }
  /**throw error if there is any db error */
  if (flagSucessCommentPost) {
    logger.error(`Error while posting comment`);
    res.status(500);
    throw new Error("Internal Server Error -can not post comment");
  } else {
    logger.info(`Comment Posted ${savedComment.commentId}`);
    res
      .status(200)
      .json(formatResponse(false, true, "Comment Posted", savedComment));
  }
};
module.exports = {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
  addComment,
};
