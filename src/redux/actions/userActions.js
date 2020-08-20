import { LOGIN, SESSION_STATE } from "./actionTypes";
import { loginApi } from "../../apis/usersApi";

export function loginAction(userInfo) {
  console.log("login action");
  //console.log("login-action");
  return async (dispatch) => {
    let loginResponse = await loginApi(userInfo);
    dispatch({ type: LOGIN, loginResponse });
  };
}
export function setUserState(userInfo) {
  console.log("userinfo:: set state");
  return (dispatch) => {
    dispatch({ type: SESSION_STATE, userInfo });
  };
}
