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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Feed({
  isAuthenticated,
  userId,
  name,
  username,
  posts,
  getAllPostsAction,
  createPostAction,
}) {
  /**define state */
  let history = useHistory();
  useEffect(() => {
    /**call get posts action */
    getAllPostsAction(localStorage.getItem("userId"));
  }, [getAllPostsAction, userId]);
  /**tweet */
  const tweet = (text, image) => {
    console.log("text::", text, image);
    let newTweetInfo = {
      description: text,
      displayName: localStorage.getItem("user"),
      userId: localStorage.getItem("userId"),
      userName: localStorage.getItem("username"),
    };
    console.log("tweet::", newTweetInfo);
    createPostAction(newTweetInfo);
  };
  return (
    <div className="feed">
      {localStorage.getItem("authToken") ? (
        <>
          <div className="feedHeader">
            <h2>Home</h2>
          </div>
          <TweetBox postTweet={tweet} />
          {posts.map((post, index) => (
            <Post key={index} info={post} />
          ))}
        </>
      ) : (
        history.push("/login")
      )}
      <ToastContainer autoClose={1000} hideProgressBar />
    </div>
  );
}
const mapStateToProps = ({ posts, user }) => {
  let { userId, isAuthenticated, name, username } = user.user;
  console.log("posts in feed com:", posts);
  return { posts, userId, isAuthenticated, name, username };
};
const mapActionToProps = { createPostAction, getAllPostsAction };
export default connect(mapStateToProps, mapActionToProps)(Feed);
