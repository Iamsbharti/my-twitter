import { baseUrl } from "./apiUtils";
import axios from "axios";
import { toast } from "react-toastify";
export const signup = async ({ name, email, username }) => {
  console.log("signup apicall::", name, email, username);
  try {
    let response = await axios.post(`${baseUrl}/api/v1/user/signup`, {
      name: name,
      email: email,
      username: username,
    });
    console.log("res::", response.data);
    return response.data;
  } catch (error) {
    console.warn(error.response.data);
    return error.response.data;
  }
};
export const loginApi = async ({ loginId, password }) => {
  console.log("login api call", loginId, password);
  try {
    let response = await axios.post(`${baseUrl}/api/v1/user/login`, {
      loginId: loginId,
      password: password,
    });
    console.log(response.data);
    let { name, email, authToken, userId, username } = response.data.data;
    /**set up localstorage */
    localStorage.setItem("user", name);
    localStorage.setItem("email", email);
    localStorage.setItem("authToken", authToken);
    localStorage.setItem("userId", userId);
    localStorage.setItem("username", username);

    /**delete authToken */
    let _response = response.data.data;
    delete _response.authToken;
    let returnRes = {
      ..._response,
      isAuthenticated: true,
      error: response.data.error,
      message: response.data.message,
    };
    return returnRes;
  } catch (error) {
    console.warn("Error::", error.response.data);
    return error.response.data;
  }
};
export const resetPassword = async (resetInfo) => {
  const {
    email,
    recoveryCode,
    password,
    currentPassword,
    operation,
  } = resetInfo;
  console.log(
    "input::",
    email,
    recoveryCode,
    password,
    currentPassword,
    operation
  );
  /**format request body based on operation */
  let requestBody;
  if (operation === "set") {
    requestBody = {
      email: email,
      currentPassword: currentPassword,
      password: password,
      operation: operation,
    };
  } else {
    requestBody = {
      email: email,
      recoveryCode: recoveryCode,
      password: password,
      operation: operation,
    };
  }
  /**call api */
  try {
    let resetResponse = await axios.post(
      `${baseUrl}/api/v1/user/resetPassword`,
      {
        ...requestBody,
      }
    );
    console.log("resetresponse::", resetResponse.data);
    return resetResponse.data;
  } catch (error) {
    console.warn(error.response.data);
    return error.response.data;
  }
};
export const recoverPassword = async (loginId) => {
  console.log("recover pwd:API:", loginId);
  try {
    let recoverResponse = await axios.post(
      `${baseUrl}/api/v1/user/recoveryPassword`,
      {
        loginId: loginId,
      }
    );
    console.log("recover res::", recoverResponse.data);
    return recoverResponse.data;
  } catch (error) {
    console.log("Error::", error.response.data);
    return error.response.data;
  }
};
export const getUserInfo = async (userId) => {
  console.log("get userInfo api:", userId);
  try {
    let authToken = localStorage.getItem("authToken");
    let userInfoResponse = await axios.get(
      `${baseUrl}/api/v1/user/getUser?userId=${userId}&authToken=${authToken}`
    );
    console.log("get user api res::", userInfoResponse);
    if (!userInfoResponse.data.error) {
      return userInfoResponse;
    }
  } catch (error) {
    console.warn("Error get User api::", error.response.data);
    return error.response.data;
  }
};
export const updateUserInfo = async (userInfo) => {
  console.log("Update user info api:", userInfo);
  try {
    let authToken = localStorage.getItem("authToken");
    let url = `${baseUrl}/api/v1/user/updateUser`;
    let updateUserResponse = await axios.post(
      url,
      { ...userInfo },
      { headers: { authToken: authToken } }
    );
    if (!updateUserResponse.data.error) {
      toast.success("Profile Updated");
      return updateUserResponse.data.data;
    }
  } catch (error) {
    console.warn("Error update user api");
    toast.error(error.response.data.message);
    return error.response.data;
  }
};
