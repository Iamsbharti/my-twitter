import { baseUrl } from "./apiUtils";
import axios from "axios";
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
    let { name, email, authToken } = response.data.data;
    /**set up localstorage */
    localStorage.setItem("user", name);
    localStorage.setItem("email", email);
    localStorage.setItem("authToken", authToken);
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
