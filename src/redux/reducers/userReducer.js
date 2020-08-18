import { LOGIN, SESSION_STATE } from "../actions/actionTypes";
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
