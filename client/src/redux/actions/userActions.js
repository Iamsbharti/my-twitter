import {
  LOGIN,
  SESSION_STATE,
  SESSION_ERROR_STATE,
  GET_USER_INFO,
  UPDATE_USER_INFO,
  UPDATE_USER_FILE,
} from "./actionTypes";
import * as userApi from "../../apis/usersApi";

export function loginAction(userInfo) {
  return async (dispatch) => {
    let loginResponse = await userApi.loginApi(userInfo);
    dispatch({ type: LOGIN, loginResponse });
  };
}
export function setUserState(userId) {
  return async (dispatch) => {
    let userInfo = await userApi.getUserInfo(userId);
    dispatch({ type: SESSION_STATE, userInfo });
  };
}
export function setUserStateOnError() {
  console.log("error-set session::");
  return (dispatch) => {
    dispatch({ type: SESSION_ERROR_STATE });
  };
}
export function getUserInfo(userId) {
  return async (dispatch) => {
    let userInfo = await userApi.getUserInfo(userId);
    dispatch({ type: GET_USER_INFO, userInfo });
  };
}
export function updateUserInfo(userInfo) {
  return async (dispatch) => {
    let updatedInfo = await userApi.updateUserInfo(userInfo);
    console.log("udpatedInfo::", updatedInfo);
    dispatch({ type: UPDATE_USER_INFO, userInfo });
  };
}
export function updateUserPictures(userInfo) {
  return (dispatch) => {
    dispatch({ type: UPDATE_USER_FILE, userInfo });
  };
}
