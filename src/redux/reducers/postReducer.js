import {
  GET_ALL_POSTS,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  UPDATE_POST_COMMENT,
} from "../actions/actionTypes";
import { posts } from "../defaultStore";

export function postReducer(_posts = posts, action) {
  let updatedPost = [..._posts];
  switch (action.type) {
    case CREATE_POST:
      updatedPost.unshift(action.createPostResponse);
      return [...updatedPost];
    case GET_ALL_POSTS:
      return action.getAllPostsResponse;
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

    case UPDATE_POST_COMMENT: {
      const { postId, update, id } = action.commentInfo;
      const { comments, retweets, likes, shares } = update;
      console.log("action result::", action.commentInfo);
      let toUpdatePost = _posts.filter((p) => p.postId === id);
      console.log("toUpdatePostComments::", toUpdatePost);
      console.log("toUpdatePostComments::", toUpdatePost[0].comments);
      let updatedComments = toUpdatePost[0].comments.map((comment) =>
        comment.commentId === postId
          ? {
              ...comment,
              retweets:
                retweets !== undefined
                  ? comment.retweets + 1
                  : comment.retweets,
              likes: likes !== undefined ? comment.likes + 1 : comment.likes,
              shares:
                shares !== undefined ? comment.shares + 1 : comment.shares,
              comments:
                comments !== undefined
                  ? [...comment.comments, comments]
                  : comment.comments,
            }
          : comment
      );
      console.log("updated comments::", updatedComments);
      return _posts.map((post) =>
        post.postId === id
          ? {
              ...post,
              comments: updatedComments,
            }
          : post
      );
    }

    case DELETE_POST:
      return _posts.filter((post) => post.postId !== action.postId);
    default:
      return _posts;
  }
}
