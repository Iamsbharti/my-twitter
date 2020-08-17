import { LOGIN } from "../actions/actionTypes";
import { session_state } from "../defaultStore";

export function userReducer(usersession = session_state.session || {}, action) {
  console.log("user resducer");
  switch (action.type) {
    case LOGIN:
      return {
        ...usersession,
        user: action.loginResponse,
      };
    default:
      return usersession;
  }
}
