import { baseUrl } from "./apiUtils";
import axios from "axios";
import { toast } from "react-toastify";
export const createPost = async (postInfo) => {
  const authToken = localStorage.getItem("authToken");
  console.log(("Create Post API Start", postInfo));
  try {
    let url = `${baseUrl}/api/v1/post/createPost`;
    let createPostResponse = await axios.post(
      url,
      { ...postInfo },
      { headers: { authToken: authToken } }
    );
    console.log("create post success::", createPostResponse.data.data);
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
    console.log("get all posts success::", getAllPosts.data.data);
    toast.success(getAllPosts.data.data.message);
    return getAllPosts.data.data;
  } catch (error) {
    console.warn("GetALl posts error::", error.response.data);
    toast.error(error.response.data.message);
    return error.response.data;
  }
};
