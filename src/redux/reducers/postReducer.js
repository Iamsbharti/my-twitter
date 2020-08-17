import { GET_ALL_POSTS, CREATE_POST } from "../actions/actionTypes";
import { posts } from "../defaultStore";
export function postReducer(_posts = posts, action) {
  console.log("post reducers");
  switch (action.type) {
    case CREATE_POST:
      return {
        ..._posts,
        posts,
      };
    case GET_ALL_POSTS:
      return {
        ..._posts,
        posts,
      };
    default:
      return posts;
  }
}
