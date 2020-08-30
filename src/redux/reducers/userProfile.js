import { GET_USER_INFO, UPDATE_USER_INFO } from "../actions/actionTypes";
import { userprofile } from "../defaultStore";
export function profileReducer(_userprofile = userprofile, action) {
  switch (action.type) {
    case GET_USER_INFO:
      return action.userInfo;
    case UPDATE_USER_INFO: {
      const { userId, updates } = action.userInfo;
      console.log("userid,updates::", userId, updates);
      const { followers } = updates;
      if (followers) {
        var [followerId, ops] = followers.split(":");
      }
      console.log("followerid,action:", followerId, ops);
      return {
        ..._userprofile,
        ...updates,
        followers:
          followers !== undefined && ops === "follow"
            ? [...userprofile.followers, followerId]
            : userprofile.followers.filter((id) => id !== followerId),
      };
    }
    default:
      return _userprofile;
  }
}
