import React, { useEffect, useState } from "react";
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
import { Avatar } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { baseUrl } from "../apis/apiUtils";
import socket from "./message/socket";
import Homeicon from "@material-ui/icons/Home";
import Searchicon from "@material-ui/icons/Search";
import NotificationsNoneicon from "@material-ui/icons/NotificationsNone";
import Emailicon from "@material-ui/icons/Email";
import BookmarkBordericon from "@material-ui/icons/BookmarkBorder";
import ListAlticon from "@material-ui/icons/ListAlt";
import PermIdentityicon from "@material-ui/icons/PermIdentity";
import MoreHorizicon from "@material-ui/icons/MoreHoriz";
import SideBarOptions from "./SideBarOptions";
import CloseIcon from "@material-ui/icons/Close";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
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
  profile,
  userInfo,
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
  const tweet = async (text, image, postImage) => {
    console.log("new tweets");
    let newTweetInfo = {
      description: text,
      displayName: name,
      userId: userId,
      userName: username,
      image: image !== undefined ? image : "",
      postImage: postImage,
    };
    console.log("new tweet info:", newTweetInfo);
    /**get the new post response and emit the same */
    let newPostresponse = await createPostAction(newTweetInfo);
    /**hide tweetbox after new tweet is posted for mobile device */
    console.log("width after tweet post:", width);
    if (width < 800) {
      setAddTweetBox(true);
    }
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
  /**handle responsiveness for tweet box and side bar */
  /**compute the current window size */
  const [toggleAddtweet, setAddTweetBox] = useState(false);
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }
  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    );
    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
  }
  /**hide tweetbox & header for mobile device */
  const [displayHeader, setHeader] = useState(false);
  const { height, width } = useWindowDimensions();
  useEffect(() => {
    if (width <= 800) {
      console.log("hiding tweet box");
      //setAddTweetBox(true);
      setHeader(true);
    }
  }, [height, width]);
  /**toggle tweet box */
  const handleToggleTweetBox = () => {
    setAddTweetBox(!toggleAddtweet);
  };
  /**handle responsive sidebar nav */
  const [toggleSideBar, setToggleSideBar] = useState(true);
  const handleDisplaySideBar = () => {
    setToggleSideBar(!toggleSideBar);
  };
  let responsiveSideBar = (
    <div>
      <div className="sidebar__responsive">
        <div className="sidebar_responsive_header">
          <p>Account info</p>
          <span>
            <CloseIcon onClick={handleDisplaySideBar} />
          </span>
        </div>
        <div className="sidebar_responsive__userinfo">
          <p>{userInfo.name}</p>
          <p>@{userInfo.username}</p>
        </div>
        <div className="sidebar__responsive__profile">
          <p>
            <span className="sidebar__responsive__number">
              {userInfo.following}
            </span>
            <span className="sidebar__responsive__span">Following</span>
          </p>

          <p>
            <span className="sidebar__responsive__number">
              {userInfo.followers && userInfo.followers.length}
            </span>
            <span className="sidebar__responsive__span">Followers</span>
          </p>
        </div>

        <SideBarOptions text="Home" Icon={Homeicon} active />
        <SideBarOptions text="Explore" Icon={Searchicon} />
        <SideBarOptions text="Notifications" Icon={NotificationsNoneicon} />
        <SideBarOptions text="Messages" Icon={Emailicon} />
        <SideBarOptions text="Booksmarks" Icon={BookmarkBordericon} />
        <SideBarOptions text="Lists" Icon={ListAlticon} />
        <SideBarOptions text="Profile" Icon={PermIdentityicon} />
        <SideBarOptions text="More" Icon={MoreHorizicon} />
        <SideBarOptions text="Logout" Icon={ExitToAppIcon} />
      </div>
    </div>
  );

  return (
    <>
      <div hidden={toggleSideBar}>{responsiveSideBar}</div>
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
                  <>
                    {displayHeader ? (
                      <>
                        <Avatar
                          className="header__responsive"
                          hidden={toggleAddtweet}
                          onClick={handleDisplaySideBar}
                          src={
                            profile &&
                            `${baseUrl}/api/v1/user/fetchPicture?filename=${
                              profile.filename
                            }&authToken=${localStorage.getItem("authToken")}`
                          }
                        ></Avatar>
                        <h2>Home</h2>
                        <AddCircleOutlineIcon
                          className="header__responsive addTweetIcon"
                          fontSize="large"
                          onClick={handleToggleTweetBox}
                        />
                      </>
                    ) : (
                      <h2>Home</h2>
                    )}
                  </>
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
                <div hidden={toggleAddtweet}>
                  <TweetBox postTweet={tweet} />
                </div>
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
  let { userId, isAuthenticated, name, username, profile } = user.user;
  return {
    posts,
    userId,
    isAuthenticated,
    name,
    username,
    profile,
    userInfo: user.user,
  };
};
const mapActionToProps = {
  createPostAction,
  getAllPostsAction,
  setUserState,
  updatePostBasedOnSocket,
  socketCreatePostAction,
};
export default connect(mapStateToProps, mapActionToProps)(Feed);
