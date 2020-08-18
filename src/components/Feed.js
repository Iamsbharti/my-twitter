import React, { useEffect } from "react";
import "../css/Feed.css";
import TweetBox from "./TweetBox";
import Post from "./Post";
import { connect } from "react-redux";
import {
  createPostAction,
  getAllPostsAction,
  updatePostAction,
} from "../redux/actions/postAction";
import { setUserState } from "../redux/actions/userActions";
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
  updatePostAction,
  setUserState,
}) {
  /**define state */
  let history = useHistory();
  useEffect(() => {
    /**set user session state upon reload */
    console.log("username::first time component load:", username, userId, name);
    if (username === undefined) {
      /**let userinfo from localstorage */
      let userInfo = {
        name: localStorage.getItem("user"),
        email: localStorage.getItem("email"),
        userId: localStorage.getItem("userId"),
        username: localStorage.getItem("username"),
      };
      setUserState(userInfo);
    }
    /**call get posts action */
    console.log("userID while gfetch posts", userId);
    if (userId !== undefined) {
      getAllPostsAction(userId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAllPostsAction, userId]);
  /**tweet */
  const tweet = (text, image) => {
    console.log("text::", text, image);
    let newTweetInfo = {
      description: text,
      displayName: name,
      userId: userId,
      userName: username,
    };
    console.log("tweet::", newTweetInfo);
    createPostAction(newTweetInfo);
  };
  /**update a post/tweet */
  const handleUpates = (updates) => {
    console.log("handle udpates feed-API__CALL", updates);
    updatePostAction(updates);
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
            <Post key={index} info={post} updateTweet={handleUpates} />
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
  console.log("user State in Feed::", user.user);
  console.log("posts in feed com:", posts);
  console.log("userid state::", userId);
  return { posts, userId, isAuthenticated, name, username };
};
const mapActionToProps = {
  createPostAction,
  getAllPostsAction,
  updatePostAction,
  setUserState,
};
export default connect(mapStateToProps, mapActionToProps)(Feed);
