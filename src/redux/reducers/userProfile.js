import {
  GET_USER_INFO,
  UPDATE_USER_INFO,
  UPDATE_USER_FILE,
} from "../actions/actionTypes";
import { userprofile } from "../defaultStore";
export function profileReducer(_userprofile = userprofile, action) {
  switch (action.type) {
    case GET_USER_INFO:
      return action.userInfo;
    case UPDATE_USER_INFO: {
      const { userId, updates } = action.userInfo;
      console.log("userid,updates::", userId);
      const { followers } = updates;
      if (followers) {
        var [followerId, ops] = followers.split(":");
      }

      return {
        ..._userprofile,
        ...updates,
        followers:
          followers !== undefined && ops === "follow"
            ? [...userprofile.followers, followerId]
            : userprofile.followers.filter((id) => id !== followerId),
      };
    }
    case UPDATE_USER_FILE: {
      const { type, file } = action.userInfo;
      if (type === "coverPicture") {
        return {
          ..._userprofile,
          coverPicture: { ...file },
        };
      } else {
        return {
          ..._userprofile,
          profile: { ...file },
        };
      }
    }
    default:
      return _userprofile;
  }
}
