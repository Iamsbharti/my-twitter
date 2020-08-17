import React, { useEffect } from "react";
import "../css/Feed.css";
import TweetBox from "./TweetBox";
import Post from "./Post";
import { connect } from "react-redux";
import {
  createPostAction,
  getAllPostsAction,
} from "../redux/actions/postAction";
import { useHistory } from "react-router-dom";
function Feed({
  isAuthenticated,
  userId,
  posts,
  getAllPostsAction,
  createPostAction,
}) {
  /**define state */
  let history = useHistory();
  useEffect(() => {
    console.log("userId in Feed::", userId);
    /**call get posts action */
    getAllPostsAction(userId);
  }, [userId]);
  return (
    <div className="feed">
      {isAuthenticated ? (
        <>
          <div className="feedHeader">
            <h2>Home</h2>
          </div>
          <TweetBox />
          {posts.map((post, index) => (
            <Post key={index} info={post} />
          ))}
        </>
      ) : (
        history.push("/login")
      )}
    </div>
  );
}
const mapStateToProps = ({ posts, user }) => {
  console.log("posts state:;", typeof posts);
  console.log("posts state:;", posts.length);
  posts.map((p) => console.log("post ::", p.userName));
  console.log("user state::", user);
  let { userId, isAuthenticated } = user.user;
  let allPosts = Object.entries(posts);
  console.log("allposts::", allPosts, typeof allPosts);
  return { posts, userId, isAuthenticated };
};
const mapActionToProps = { createPostAction, getAllPostsAction };
export default connect(mapStateToProps, mapActionToProps)(Feed);
