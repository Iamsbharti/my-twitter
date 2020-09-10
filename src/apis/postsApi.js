import { baseUrl } from "./apiUtils";
import axios from "axios";
import { toast } from "react-toastify";
import FormData from "form-data";

export const createPost = async (postInfo) => {
  const {
    description,
    displayName,
    userId,
    userName,
    image,
    postImage,
  } = postInfo;
  const authToken = localStorage.getItem("authToken");
  console.log("Create Post API Start:", postImage);
  let data = new FormData();
  data.append("description", description);
  data.append("displayName", displayName);
  data.append("userId", userId);
  data.append("userName", userName);
  data.append("image", image);
  data.append("file", postImage);

  var createPostConfig = {
    method: "post",
    url: `${baseUrl}/api/v1/post/createPost`,
    headers: {
      authToken: authToken,
    },
    data: data,
  };
  try {
    let createPostResponse = await axios(createPostConfig);
    console.log("create post success::", createPostResponse.data.message);
    if (!createPostResponse.data.error) {
      toast.success("Tweet Posted");
    }

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
    console.log("get all posts success");
    toast.success(getAllPosts.data.data.message);
    return getAllPosts.data.data;
  } catch (error) {
    console.warn("GetALl posts error::", error.response.data);
    toast.error(error.response.data.message);
    return error.response.data;
  }
};
export const updatePost = async (postInfo) => {
  console.log("update post api start");
  let authToken = localStorage.getItem("authToken");
  try {
    let url = `${baseUrl}/api/v1/post/updatePost`;
    let updatePostResponse = await axios.post(
      url,
      { ...postInfo },
      { headers: { authToken: authToken } }
    );
    console.log("update post res::", updatePostResponse.data.data.message);
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
  console.log("delete post api start");
  let authToken = localStorage.getItem("authToken");
  try {
    let deleteResponse = await axios.delete(
      `${baseUrl}/api/v1/post/deletePost?postId=${postId}&authToken=${authToken}`
    );
    console.log("Delete Tweet sucess");
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
  console.log("update post api start::", commentInfo);
  let authToken = localStorage.getItem("authToken");
  try {
    let url = `${baseUrl}/api/v1/post/addComment`;
    let updatePostResponse = await axios.post(
      url,
      { ...commentInfo },
      { headers: { authToken: authToken } }
    );
    toast.success("You replied to a tweet");
    return updatePostResponse.data.data;
  } catch (error) {
    console.warn("Update post error::", error.response.data);
    console.log("toast-error");
    toast.error(error.response.data);
    return error.response.data;
  }
};
export const deleteComment = async (commentInfo) => {
  let { commentId } = commentInfo;
  console.log("delete post api start");
  let authToken = localStorage.getItem("authToken");
  try {
    let deleteResponse = await axios.delete(
      `${baseUrl}/api/v1/post/deleteComment?commentId=${commentId}&authToken=${authToken}`
    );
    console.log("Delete comment success");
    let { error } = deleteResponse.data;
    if (!error) {
      toast.error("comment Deleted");
      return commentInfo;
    }
  } catch (error) {
    console.warn("Delete comment error::", error.response.data);
    console.log("toast-error");
    toast.error(error.response.data);
    return error.response.data;
  }
};
