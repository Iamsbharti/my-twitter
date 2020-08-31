import React, { useEffect } from "react";
import "../css/Feed.css";
import TweetBox from "./TweetBox";
import Post from "./Post";
import { connect } from "react-redux";
import {
  createPostAction,
  getAllPostsAction,
} from "../redux/actions/postAction";
import { setUserState } from "../redux/actions/userActions";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import io from "socket.io-client";

function Feed({
  isAuthenticated,
  userId,
  name,
  username,
  posts,
  getAllPostsAction,
  createPostAction,
  setUserState,
  tweetStatus,
  bookmark,
  bookmarks,
}) {
  /**define state */
  let history = useHistory();

  const url =
    process.env.NODE_ENV === "production" ? "" : "http://localhost:3001/chat";

  const socket = io(url);
  console.log("socket:", socket);
  useEffect(() => {
    /**set user session state upon reload */
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
    if (userId !== undefined && tweetStatus === undefined) {
      console.log("invoke get post");
      getAllPostsAction(userId);
      socket.on("welcome", (data) => {
        toast.success(data);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);
  /**tweet */
  const tweet = (text, image) => {
    console.log("text::", text, image);
    let newTweetInfo = {
      description: text,
      displayName: name,
      userId: userId,
      userName: username,
      image: image !== undefined ? image : "",
    };
    createPostAction(newTweetInfo);
  };
  /**route back to feed  */
  const handleBackToFeed = () => {
    history.push("/tweets");
  };
  return (
    <>
      <div className="feed">
        {localStorage.getItem("authToken") ? (
          <>
            <div className="feedHeader">
              {/**conditionally render single tweet header and all tweets header*/}
              {tweetStatus === undefined ? (
                bookmark ? (
                  <>
                    <div className="status__header">
                      <ArrowBackIcon
                        fontSize="large"
                        className="status__icon"
                        onClick={handleBackToFeed}
                      />
                      <h3>Tweet</h3>
                    </div>
                    <p>BookMarks</p>
                  </>
                ) : (
                  <h2>Home</h2>
                )
              ) : (
                <div className="status__header">
                  <ArrowBackIcon
                    fontSize="large"
                    className="status__icon"
                    onClick={handleBackToFeed}
                  />
                  <h3>Tweet</h3>
                </div>
              )}
            </div>
            {/**conditionally render single tweet view and all tweets */}
            {tweetStatus === undefined ? (
              bookmark ? (
                ""
              ) : (
                <TweetBox postTweet={tweet} />
              )
            ) : (
              ""
            )}
            {tweetStatus === undefined ? (
              bookmark ? (
                bookmarks.map((post, index) => (
                  <Post key={index} info={post} status={false} />
                ))
              ) : (
                posts.map((post, index) => (
                  <Post key={index} info={post} status={false} />
                ))
              )
            ) : (
              <Post info={tweetStatus} status={true} />
            )}
          </>
        ) : (
          history.push("/login")
        )}
      </div>
      <ToastContainer autoClose={1000} hideProgressBar />
    </>
  );
}
const mapStateToProps = ({ posts, user }, ownProps) => {
  let { userId, isAuthenticated, name, username } = user.user;
  return { posts, userId, isAuthenticated, name, username };
};
const mapActionToProps = {
  createPostAction,
  getAllPostsAction,
  setUserState,
};
export default connect(mapStateToProps, mapActionToProps)(Feed);
