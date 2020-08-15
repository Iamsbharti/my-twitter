import { baseUrl } from "./apiUtils";
import axios from "axios";
export const signup = async ({ name, email, username }) => {
  console.log("signup apicall::", name, email, username);
  try {
    let response = await axios.post(`${baseUrl}/user/signup`, {
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
