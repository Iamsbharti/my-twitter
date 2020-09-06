import {
  LOGIN,
  SESSION_STATE,
  GET_USER_INFO,
  UPDATE_USER_INFO,
} from "./actionTypes";
import * as userApi from "../../apis/usersApi";

export function loginAction(userInfo) {
  console.log("login action");
  //console.log("login-action");
  return async (dispatch) => {
    let loginResponse = await userApi.loginApi(userInfo);
    dispatch({ type: LOGIN, loginResponse });
  };
}
export function setUserState(userId) {
  console.log("userinfo:: set state:", userId);
  return async (dispatch) => {
    let userInfo = await userApi.getUserInfo(userId);
    dispatch({ type: SESSION_STATE, userInfo });
  };
}
export function getUserInfo(userId) {
  console.log("get user action");
  return async (dispatch) => {
    let userInfo = await userApi.getUserInfo(userId);
    dispatch({ type: GET_USER_INFO, userInfo });
  };
}
export function updateUserInfo(userInfo) {
  console.log("update user action");
  return async (dispatch) => {
    let updatedInfo = await userApi.updateUserInfo(userInfo);
    console.log("udpatedInfo::", updatedInfo);
    dispatch({ type: UPDATE_USER_INFO, userInfo });
  };
}
