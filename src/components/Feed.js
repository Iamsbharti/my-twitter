import React, { useEffect } from "react";
import "../css/Feed.css";
import TweetBox from "./TweetBox";
import Post from "./Post";
import { connect } from "react-redux";
import {
  createPostAction,
  getAllPostsAction,
  updatePostBasedOnSocket,
  socketCreatePostAction,
} from "../redux/actions/postAction";
import { setUserState } from "../redux/actions/userActions";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import socket from "./message/socket";

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
  updatePostBasedOnSocket,
  socketCreatePostAction,
}) {
  /**define state */
  let history = useHistory();
  useEffect(() => {
    /**set user session state upon reload */
    if (username === undefined) {
      /**let userinfo from localstorage */
      setUserState(localStorage.getItem("userId"));
    }
    setUserState(localStorage.getItem("userId"));
    /**call get posts action */
    if (userId !== undefined && tweetStatus === undefined) {
      getAllPostsAction(userId);
      socket.on("welcome", (data) => {
        toast.success(data);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);
  /**tweet */
  const tweet = async (text, image) => {
    let newTweetInfo = {
      description: text,
      displayName: name,
      userId: userId,
      userName: username,
      image: image !== undefined ? image : "",
    };

    /**get the new post response and emit the same */
    let newPostresponse = await createPostAction(newTweetInfo);

    /**emit tweets action to the followers */
    let socketInfo = {
      tweetsUserId: userId,
      name: name,
      newPost: newPostresponse,
    };
    socket.emit("post_tweet", socketInfo);
  };
  /**route back to feed  */
  const handleBackToFeed = () => {
    history.push("/tweets");
  };
  /**toast new notification from any users */
  useEffect(() => {
    if (userId !== undefined) {
      socket.on("new_tweet", (data) => {
        let { tweetsUserId, name } = data;
        if (userId !== undefined && tweetsUserId !== userId) {
          toast.info(`${name} tweeted a while ago`);
          //updates state to minimize reload page
          socketCreatePostAction(data.newPost);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, socketCreatePostAction]);

  /**listen(socket) for comments on post */
  useEffect(() => {
    socket.on("comment_on_post", (data) => {
      const { usersPostID, displayName } = data;
      if (usersPostID === userId) {
        toast.info(`${displayName} commented on your post`);
      }
    });
  }, [userId]);

  /**listen(socket) for any action on post */
  useEffect(() => {
    socket.on("notify_post_action", (data) => {
      const { postOwnerId, message, postInfo } = data;
      if (postOwnerId === userId) {
        toast.success(message);
        /**update the poststate minimize reload*/
        updatePostBasedOnSocket(postInfo);
      }
    });
  }, [userId, updatePostBasedOnSocket]);

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
      <ToastContainer autoClose={1599} hideProgressBar />
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
  updatePostBasedOnSocket,
  socketCreatePostAction,
};
export default connect(mapStateToProps, mapActionToProps)(Feed);
