import {
  GET_ALL_POSTS,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  UPDATE_POST_COMMENT,
} from "./actionTypes";
import * as postApi from "../../apis/postsApi";

export const createPostAction = (postInfo) => {
  console.log("Create post action:", postInfo);
  return async (dispatch) => {
    let createPostResponse = await postApi.createPost(postInfo);
    dispatch({ type: CREATE_POST, createPostResponse });
  };
};
export const getAllPostsAction = (userId) => {
  console.log("Get all post action ::", userId);
  return async (dispatch) => {
    let getAllPostsResponse = await postApi.getAllPosts(userId);
    dispatch({ type: GET_ALL_POSTS, getAllPostsResponse });
  };
};
export const updatePostAction = (postInfo) => {
  console.log("update post action:", postInfo);
  return async (dispatch) => {
    let updatedPost = await postApi.updatePost(postInfo);
    console.log("api res-action::", updatedPost);
    dispatch({ type: UPDATE_POST, postInfo });
  };
};
export const updatePostCommentAction = (commentInfo, id) => {
  console.log("update postcomment action:", commentInfo);
  return async (dispatch) => {
    let updatedPost = await postApi.updatePost(commentInfo);
    console.log("api res-action::", updatedPost);
    dispatch({ type: UPDATE_POST_COMMENT, commentInfo });
  };
};
export const deletePostAction = (postId) => {
  console.log("Delete tweet::", postId);
  return async (dispatch) => {
    let deletedTweet = await postApi.deletePost(postId);
    console.log("Delete action res::", deletedTweet);
    dispatch({ type: DELETE_POST, postId });
  };
};
