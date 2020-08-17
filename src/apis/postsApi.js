import baseUrl from "./apiUtils";
import axios from "axios";
const authToken = localStorage.getItem("authToken");

export const createPost = async (postInfo) => {
  console.log("Create Post API Start");
  try {
    let createOptions = {
      method: "POST",
      headers: { authToken: authToken },
      url: `${baseUrl}/api/v1/post/createPost`,
      body: { ...postInfo },
    };
    let createPostResponse = await axios.post(createOptions);
    console.log("create post success::", createPostResponse.data);
    return createPostResponse.data;
  } catch (error) {
    console.warn("Create POST Error::", error.response.data);
    return error.response.data;
  }
};
export const getAllPosts = async (userId) => {
  console.log("Get All post api start");
  try {
    let getAllPosts = await axios.get(
      `${baseUrl}/api/v1/post/allPosts?userId=${userId}&authToken=${authToken}`
    );
    console.log("get all posts success::", getAllPosts.data);
    return getAllPosts.data;
  } catch (error) {
    console.warn("GetALl posts error::", error.response.data);
    return error.response.data;
  }
};