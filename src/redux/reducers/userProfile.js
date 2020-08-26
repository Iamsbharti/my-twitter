import { GET_USER_INFO, UPDATE_USER_INFO } from "../actions/actionTypes";
export function userReducer(userprofile = {}, action) {
  switch (action.type) {
    case GET_USER_INFO:
      return action.userInfo;
    case UPDATE_USER_INFO: {
      return {
        ...userprofile,
        ...action.userInfo,
      };
    }
    default:
      return userprofile;
  }
}
