import { baseUrl } from "./apiUtils";
import axios from "axios";
import { toast } from "react-toastify";
export const createPost = async (postInfo) => {
  const authToken = localStorage.getItem("authToken");
  console.log("Create Post API Start");
  try {
    let url = `${baseUrl}/api/v1/post/createPost`;
    let createPostResponse = await axios.post(
      url,
      { ...postInfo },
      { headers: { authToken: authToken } }
    );
    console.log("create post success::");
    toast.success(createPostResponse.data.data.message);
    return createPostResponse.data.data;
  } catch (error) {
    console.warn("Create POST Error::", error.response.data);
    toast.error(error.response.data.message);
    return error.response.data;
  }
};
export const getAllPosts = async (userId) => {
  const authToken = localStorage.getItem("authToken");
  console.log("Get All post api start");
  try {
    let getAllPosts = await axios.get(
      `${baseUrl}/api/v1/post/allPosts?userId=${userId}&authToken=${authToken}`
    );
    console.log("get all posts success::");
    toast.success(getAllPosts.data.data.message);
    return getAllPosts.data.data;
  } catch (error) {
    console.warn("GetALl posts error::", error.response.data);
    toast.error(error.response.data.message);
    return error.response.data;
  }
};
export const updatePost = async (postInfo) => {
  console.log("update post api start:", postInfo);
  let authToken = localStorage.getItem("authToken");
  try {
    let url = `${baseUrl}/api/v1/post/updatePost`;
    let updatePostResponse = await axios.post(
      url,
      { ...postInfo },
      { headers: { authToken: authToken } }
    );
    console.log("update post res::", updatePostResponse);
    console.log("success- toast");
    toast.success("Tweet updated");
    return postInfo;
  } catch (error) {
    console.warn("Update post error::", error.response.data);
    console.log("toast-error");
    toast.error(error.response.data);
    return error.response.data;
  }
};
export const deletePost = async (postId) => {
  console.log("delete post api start::", postId);
  let authToken = localStorage.getItem("authToken");
  try {
    let deleteResponse = await axios.delete(
      `${baseUrl}/api/v1/post/deletePost?postId=${postId}&authToken=${authToken}`
    );
    console.log("Delete Tweet response::", deleteResponse.data);
    let { error } = deleteResponse.data;
    if (!error) {
      toast.error("Tweet Deleted");
      return postId;
    }
  } catch (error) {
    console.warn("Delete post error::", error.response.data);
    console.log("toast-error");
    toast.error(error.response.data);
    return error.response.data;
  }
};

export const setComments = async (commentInfo) => {
  console.log("update post api start:", commentInfo);
  let authToken = localStorage.getItem("authToken");
  try {
    let url = `${baseUrl}/api/v1/post/addComment`;
    let updatePostResponse = await axios.post(
      url,
      { ...commentInfo },
      { headers: { authToken: authToken } }
    );
    console.log("update post res::", updatePostResponse);
    console.log("success- toast");
    toast.success("You replied to a tweet");
    return updatePostResponse.data.data;
  } catch (error) {
    console.warn("Update post error::", error.response.data);
    console.log("toast-error");
    toast.error(error.response.data);
    return error.response.data;
  }
};
