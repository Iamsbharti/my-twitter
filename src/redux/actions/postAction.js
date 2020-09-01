import {
  GET_ALL_POSTS,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  UPDATE_POST_COMMENT,
  ADD_COMMENT,
  DELETE_COMMENT,
} from "./actionTypes";
import * as postApi from "../../apis/postsApi";

export const createPostAction = (postInfo) => {
  console.log("Create post action:");
  return async (dispatch) => {
    let createPostResponse = await postApi.createPost(postInfo);
    dispatch({ type: CREATE_POST, createPostResponse });
    return createPostResponse;
  };
};
export const socketCreatePostAction = (newPost) => {
  let createPostResponse = newPost;
  return (dispatch) => {
    dispatch({ type: CREATE_POST, createPostResponse });
  };
};
export const getAllPostsAction = (userId) => {
  console.log("Get all post action ::");
  return async (dispatch) => {
    let getAllPostsResponse = await postApi.getAllPosts(userId);
    dispatch({ type: GET_ALL_POSTS, getAllPostsResponse });
  };
};
export const updatePostAction = (postInfo) => {
  console.log("update post action:");
  return async (dispatch) => {
    let updatedPost = await postApi.updatePost(postInfo);
    console.log("api res-action::", updatedPost);
    dispatch({ type: UPDATE_POST, postInfo });
  };
};
export const updatePostCommentAction = (_commentInfo, id) => {
  console.log("update postcomment action:");
  return async (dispatch) => {
    let updatedPost = await postApi.updatePost(_commentInfo);
    console.log("api res-action::", updatedPost);
    let commentInfo = _commentInfo;
    commentInfo = { ..._commentInfo, id: id };
    dispatch({ type: UPDATE_POST_COMMENT, commentInfo });
  };
};
export const updatePostBasedOnSocket = (postInfo) => {
  console.log("socket updates:", postInfo);
  return (dispatch) => {
    dispatch({ type: UPDATE_POST, postInfo });
  };
};
export const deletePostAction = (postId) => {
  console.log("Delete tweet::");
  return async (dispatch) => {
    let deletedTweet = await postApi.deletePost(postId);
    console.log("Delete action res::", deletedTweet);
    dispatch({ type: DELETE_POST, postId });
  };
};
export const addCommentAction = (commentInfo) => {
  console.log("addCommentAction tweet::");
  return async (dispatch) => {
    let newComments = await postApi.setComments(commentInfo);
    console.log("new cooments action::");
    dispatch({ type: ADD_COMMENT, newComments });
  };
};
export const deleteCommentAction = (commentInfo) => {
  console.log("Delete tweet comment::");
  return async (dispatch) => {
    let deletedTweetComment = await postApi.deleteComment(commentInfo);
    console.log("Delete action res::", deletedTweetComment);
    dispatch({ type: DELETE_COMMENT, commentInfo });
  };
};
