import { GET_ALL_POSTS, CREATE_POST } from "../actions/actionTypes";
import { posts } from "../defaultStore";
export function postReducer(_posts = posts, action) {
  console.log("post reducers");
  let updatedPost = [..._posts];
  switch (action.type) {
    case CREATE_POST:
      updatedPost.unshift(action.createPostResponse);
      return [...updatedPost];
    case GET_ALL_POSTS:
      return [..._posts, ...action.getAllPostsResponse];
    default:
      return _posts;
  }
}
