import {
  LOGIN,
  SESSION_STATE,
  GET_USER_INFO,
  UPDATE_USER_INFO,
} from "../actions/actionTypes";
import { session_state } from "../defaultStore";

export function userReducer(usersession = session_state.session || {}, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...usersession,
        user: action.loginResponse,
      };
    case SESSION_STATE:
      return {
        ...usersession,
        user: action.userInfo,
      };
    default:
      return usersession;
  }
}
