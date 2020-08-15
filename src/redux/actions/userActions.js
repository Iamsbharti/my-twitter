import { LOGIN } from "./actionTypes";
import { loginApi } from "../../apis/usersApi";

export function loginAction(userInfo) {
  console.log("login action::", userInfo);
  //console.log("login-action");
  return async (dispatch) => {
    let loginResponse = await loginApi(userInfo);
    dispatch({ type: LOGIN, loginResponse });
  };
}
