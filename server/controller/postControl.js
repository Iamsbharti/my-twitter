const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");
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
const verifyPost = async (postId) => {
  let postExists = await Post.findOne({ postId: postId });
  return postExists
    ? postExists
    : formatResponse(true, 404, "Post Not Found", postExists);
};
const verifyCommentPost = async (postId) => {
  let postExists = await Comment.findOne({ commentId: postId });
  return postExists
    ? postExists
    : formatResponse(true, 404, "CommentPost Not Found", postExists);
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
  /**return all available posts with populating the comments */
  Post.find()
    .populate("comments")
    .select(EXCLUDE)
    .exec(function (err, posts) {
      if (err) {
        logger.info(`Get Posts Error ${err}`);
        res
          .status(500)
          .json(formatResponse(true, 500, "Internal Server Error", err));
      } else {
        logger.info("Posts Fetched");
        res
          .status(200)
          .json(formatResponse(false, 200, "Fetched All Posts", posts));
      }
    });
};
const updatePost = async (req, res) => {
  logger.info("Update a Post");
  const { postId, update, isComment, userId } = req.body;
  /**search for existing post */
  let query;
  let isPostValid;
  /**form query based on isComment */
  query = isComment ? { commentId: postId } : { postId: postId };
  console.log("query::", query);
  if (isComment) {
    isPostValid = await verifyCommentPost(postId);
    if (isPostValid.error) {
      return res.status(isPostValid.status).json(isPostValid);
    }
  } else {
    isPostValid = await verifyPost(postId);
    if (isPostValid.error) {
      return res.status(isPostValid.status).json(isPostValid);
    }
  }
  /**update the specific post */
  let { comments, retweets, likes, shares } = update;
  let updateOptions = {};
  /**retweeted by and undo retweet query */
  let retweetsByQuery;
  if (isPostValid.retweetsBy.includes(userId)) {
    retweetsByQuery = {
      $pull: { retweetsBy: userId },
      retweets: isPostValid.retweets - 1,
    };
  } else {
    retweetsByQuery = {
      $push: { retweetsBy: userId },
      retweets: isPostValid.retweets + retweets,
    };
  }
  if (retweets !== undefined) {
    updateOptions = {
      ...updateOptions,
      ...retweetsByQuery,
    };
  }
  /**like & dislike  query */
  let likeQuery;
  if (likes === 1) {
    likeQuery = { $push: { likedBy: userId } };
  } else {
    likeQuery = { $pull: { likedBy: userId } };
  }
  if (likes !== undefined) {
    updateOptions = {
      ...updateOptions,
      likes: likes === 1 ? isPostValid.likes + likes : isPostValid.likes - 1,
      ...likeQuery,
    };
  }
  if (shares !== undefined) {
    updateOptions = {
      ...updateOptions,
      shares: isPostValid.shares + shares,
      $push: { sharedBy: userId },
    };
  }
  if (comments !== undefined) {
    updateOptions = { ...updateOptions, $push: { comments: comments } };
  }
  if (!isComment) {
    console.log("updating post", updateOptions, isPostValid.likes + likes);
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
  } else {
    console.log("updating comment");
    Comment.updateOne(query, updateOptions, (error, udpatedPost) => {
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
  }
};
const deletePost = async (req, res) => {
  logger.info("Delete post control");
  let { postId } = req.query;

  /**search for existing post */
  let isPostValid = await verifyPost(postId);
  if (isPostValid.error) {
    return res.status(isPostValid.status).json(isPostValid);
  }
  /**delete comments related to the postId */
  let deletedComments = await Comment.deleteMany({ postId: postId });
  if (!deletedComments) {
    res.status(500);
    throw new Error(`Internal server error`);
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
const deleteComment = async (req, res) => {
  logger.info("Delete comment control");
  const { commentId } = req.query;
  let isPostValid = await verifyCommentPost(commentId);
  if (isPostValid.error) {
    return res.status(isPostValid.status).json(isPostValid);
  }
  /**delete comment */
  let deletedComment = await Comment.deleteOne({ commentId: commentId });
  if (deleteComment) {
    let { n } = deletedComment;
    res
      .status(200)
      .json(formatResponse(false, 200, "Comment deleted", `${n}-doc deleted`));
  } else {
    res
      .status(500)
      .json(formatResponse(false, 500, "Internal Server Error", null));
  }
};
module.exports = {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
  addComment,
  deleteComment,
};
