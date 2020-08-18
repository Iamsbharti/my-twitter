import {
  GET_ALL_POSTS,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
} from "../actions/actionTypes";
import { posts } from "../defaultStore";

export function postReducer(_posts = posts, action) {
  let updatedPost = [..._posts];
  switch (action.type) {
    case CREATE_POST:
      updatedPost.unshift(action.createPostResponse);
      return [...updatedPost];
    case GET_ALL_POSTS:
      return [..._posts, ...action.getAllPostsResponse];
    case UPDATE_POST:
      const { postId, update } = action.postInfo;
      const { comments, retweets, likes, shares } = update;
      console.log("action result::", action.postInfo);
      return _posts.map((post) =>
        post.postId === postId
          ? {
              ...post,
              retweets:
                retweets !== undefined ? post.retweets + 1 : post.retweets,
              likes: likes !== undefined ? post.likes + 1 : post.likes,
              shares: shares !== undefined ? post.shares + 1 : post.shares,
              comments:
                comments !== undefined
                  ? [...post.comments, comments]
                  : post.comments,
            }
          : post
      );

    case DELETE_POST:
      return _posts.filter((post) => post.postId !== action.postId);
    default:
      return _posts;
  }
}
