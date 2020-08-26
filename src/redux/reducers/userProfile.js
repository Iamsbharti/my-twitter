import { GET_USER_INFO, UPDATE_USER_INFO } from "../actions/actionTypes";
import { userprofile } from "../defaultStore";
export function profileReducer(_userprofile = userprofile, action) {
  switch (action.type) {
    case GET_USER_INFO:
      return action.userInfo;
    case UPDATE_USER_INFO: {
      return {
        ..._userprofile,
        ...action.userInfo,
      };
    }
    default:
      return _userprofile;
  }
}
