import {
  GET_ALL_POSTS,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  UPDATE_POST_COMMENT,
  ADD_COMMENT,
  DELETE_COMMENT,
} from "../actions/actionTypes";
import { posts } from "../defaultStore";

export function postReducer(_posts = posts, action) {
  let updatedPost = [..._posts];
  switch (action.type) {
    case CREATE_POST:
      updatedPost.unshift(action.createPostResponse);
      return [...updatedPost];
    case GET_ALL_POSTS:
      return action.getAllPostsResponse.length === 0
        ? posts
        : action.getAllPostsResponse;
    case UPDATE_POST:
      const { postId, update, userId } = action.postInfo;
      const { comments, retweets, likes, shares, bookmark } = update;

      return _posts.map((post) =>
        post.postId === postId
          ? {
              ...post,
              retweets:
                retweets !== undefined
                  ? retweets === 1 && post.retweetsBy.includes(userId)
                    ? post.retweets - 1
                    : post.retweets + 1
                  : post.retweets,
              retweetsBy:
                retweets !== undefined
                  ? post.retweetsBy.includes(userId)
                    ? post.retweetsBy.filter((user) => user !== userId)
                    : [...post.retweetsBy, userId]
                  : post.retweetsBy,
              likes:
                likes !== undefined
                  ? likes === 1
                    ? post.likes + 1
                    : post.likes === 0
                    ? 0
                    : post.likes - 1
                  : post.likes,
              likedBy:
                likes !== undefined
                  ? likes === -1
                    ? post.likedBy.filter((user) => user !== userId)
                    : [...post.likedBy, userId]
                  : post.likedBy,
              shares: shares !== undefined ? post.shares + 1 : post.shares,
              comments:
                comments !== undefined
                  ? [...post.comments, comments]
                  : post.comments,
              bookMarkedBy:
                bookmark !== undefined
                  ? bookmark
                    ? [...post.bookMarkedBy, userId]
                    : post.bookMarkedBy.filter((id) => id !== userId)
                  : post.bookMarkedBy,
            }
          : post
      );

    case UPDATE_POST_COMMENT: {
      const { postId, update, id, userId } = action.commentInfo;
      const { comments, retweets, likes, shares } = update;
      let toUpdatePost = _posts.filter((p) => p.postId === id);
      let updatedComments = toUpdatePost[0].comments.map((comment) =>
        comment.commentId === postId
          ? {
              ...comment,
              retweets:
                retweets !== undefined
                  ? retweets === 1 && comment.retweetsBy.includes(userId)
                    ? comment.retweets - 1
                    : comment.retweets + 1
                  : comment.retweets,
              retweetsBy:
                retweets !== undefined
                  ? comment.retweetsBy.includes(userId)
                    ? comment.retweetsBy.filter((user) => user !== userId)
                    : [...comment.retweetsBy, userId]
                  : comment.retweetsBy,
              likes:
                likes !== undefined
                  ? likes === 1
                    ? comment.likes + 1
                    : comment.likes === 0
                    ? 0
                    : comment.likes - 1
                  : comment.likes,
              likedBy:
                likes !== undefined
                  ? likes === -1
                    ? comment.likedBy.filter((user) => user !== userId)
                    : [...comment.likedBy, userId]
                  : comment.likedBy,
              shares:
                shares !== undefined ? comment.shares + 1 : comment.shares,
              comments:
                comments !== undefined
                  ? [...comment.comments, comments]
                  : comment.comments,
            }
          : comment
      );
      return _posts.map((post) =>
        post.postId === id
          ? {
              ...post,
              comments: updatedComments,
            }
          : post
      );
    }
    case ADD_COMMENT: {
      const { postId } = action.newComments;
      let toAddComment = action.newComments;
      return _posts.map((post) =>
        post.postId === postId
          ? { ...post, comments: [...post.comments, toAddComment] }
          : post
      );
    }
    case DELETE_COMMENT: {
      const { postId, commentId } = action.commentInfo;
      return _posts.map((post) =>
        post.postId === postId
          ? {
              ...post,
              comments: post.comments.filter(
                (com) => com.commentId !== commentId
              ),
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
