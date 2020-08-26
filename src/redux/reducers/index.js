import { userReducer } from "./userReducer";
import { postReducer } from "./postReducer";
import { profileReducer } from "./userProfile";
import { combineReducers } from "redux";
export default combineReducers({
  user: userReducer,
  posts: postReducer,
  profile: profileReducer,
});
