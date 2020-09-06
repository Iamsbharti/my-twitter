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
  return async (dispatch) => {
    let getAllPostsResponse = await postApi.getAllPosts(userId);
    dispatch({ type: GET_ALL_POSTS, getAllPostsResponse });
  };
};
export const updatePostAction = (postInfo) => {
  return async (dispatch) => {
    let updatedPost = await postApi.updatePost(postInfo);
    console.log("api res-action::", updatedPost);
    dispatch({ type: UPDATE_POST, postInfo });
  };
};
export const updatePostCommentAction = (_commentInfo, id) => {
  return async (dispatch) => {
    let updatedPost = await postApi.updatePost(_commentInfo);
    console.log("api res-action::", updatedPost);
    let commentInfo = _commentInfo;
    commentInfo = { ..._commentInfo, id: id };
    dispatch({ type: UPDATE_POST_COMMENT, commentInfo });
  };
};
export const updatePostBasedOnSocket = (postInfo) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_POST, postInfo });
  };
};
export const deletePostAction = (postId) => {
  return async (dispatch) => {
    let deletedTweet = await postApi.deletePost(postId);
    console.log("Delete action res::", deletedTweet);
    dispatch({ type: DELETE_POST, postId });
  };
};
export const addCommentAction = (commentInfo) => {
  return async (dispatch) => {
    let newComments = await postApi.setComments(commentInfo);
    dispatch({ type: ADD_COMMENT, newComments });
  };
};
export const deleteCommentAction = (commentInfo) => {
  return async (dispatch) => {
    let deletedTweetComment = await postApi.deleteComment(commentInfo);
    console.log("Delete action res::", deletedTweetComment);
    dispatch({ type: DELETE_COMMENT, commentInfo });
  };
};
