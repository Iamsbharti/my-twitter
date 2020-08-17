import { userReducer } from "./userReducer";
import { postReducer } from "./postReducer";

import { combineReducers } from "redux";
export default combineReducers({
  user: userReducer,
  posts: postReducer,
});
