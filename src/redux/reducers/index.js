import { userReducer } from "./userReducer";
import { postReducer } from "./postReducer";
import { profileReducer } from "./userProfile";
import { chatReducer } from "./chatReducer";
import { combineReducers } from "redux";
export default combineReducers({
  user: userReducer,
  posts: postReducer,
  profile: profileReducer,
  chat: chatReducer,
});
