import { userReducer } from "./userReducer";
import { postReducer } from "./postReducer";
import { userProfile } from "./userProfile";
import { combineReducers } from "redux";
export default combineReducers({
  user: userReducer,
  posts: postReducer,
  profile: userProfile,
});
