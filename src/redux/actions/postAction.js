import { GET_ALL_POSTS, CREATE_POST } from "./actionTypes";
import * as postApi from "../../apis/postsApi";

export const createPostAction = (postInfo) => {
  console.log("Create post action");
  return async (dispatch) => {
    let createPostResponse = await postApi.createPost(postInfo);
    dispatch({ CREATE_POST, createPostResponse });
  };
};
export const getAllPostsAction = (userId) => {
  console.log("Get all post action ::", userId);
  return async (dispatch) => {
    let getAllPostsResponse = await postApi.getAllPosts(userId);
    dispatch({ GET_ALL_POSTS, getAllPostsResponse });
  };
};
