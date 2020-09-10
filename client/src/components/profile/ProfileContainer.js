import React, { useEffect, useState } from "react";
import "../../css/Profile.css";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import ProfilePresentation from "./ProfilePresentation";
import { getUserInfo } from "../../redux/actions/userActions";
import { getAllPostsAction } from "../../redux/actions/postAction";
import {
  updateUserInfo,
  updateUserPictures,
} from "../../redux/actions/userActions";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import FormData from "form-data";
import { baseUrl } from "../../apis/apiUtils";
function Profile({
  userId,
  getUserInfo,
  profile,
  tweets,
  posts,
  tweetsReplies,
  mediaTweets,
  likedTweets,
  currentUserId,
  getAllPostsAction,
  updateUserInfo,
  updateUserPictures,
}) {
  const [showTweets, toggleTweets] = useState(false);
  const [showRelpiesTweets, toggleRepliesTweets] = useState(true);
  const [showMediaTweets, toggleMediaTweets] = useState(true);
  const [showLikedTweets, toggleLikesTweets] = useState(true);
  const [activeTweetsTab, setActiveTab] = useState(false);
  const [showManageProfile, toggleManageProfile] = useState(false);
  let history = useHistory();
  const handleBackToTweets = () => {
    history.goBack();
  };
  /**invoke specific hide and show div when the tweet tab is clicked
   * and update the current post state accordingly and mark the clicked
   * tab active
   */
  const handleTweets = (e) => {
    switch (e.target.innerHTML) {
      case "Tweets":
        toggleTweets(false);
        toggleRepliesTweets(true);
        setActiveTab(true);
        toggleMediaTweets(true);
        toggleLikesTweets(true);
        break;
      case "Tweets &amp; Replies":
        toggleTweets(true);
        toggleRepliesTweets(false);
        setActiveTab(true);
        toggleMediaTweets(true);
        toggleLikesTweets(true);
        break;
      case "Media":
        toggleTweets(true);
        toggleRepliesTweets(true);
        toggleMediaTweets(false);
        setActiveTab(true);
        toggleLikesTweets(true);
        break;
      case "Likes":
        toggleTweets(true);
        toggleRepliesTweets(true);
        toggleMediaTweets(true);
        toggleLikesTweets(false);
        setActiveTab(true);
        break;
      default:
        break;
    }
  };
  /**call get user info api */
  useEffect(() => {
    getUserInfo(userId);
  }, [userId, getUserInfo, posts]);

  /**get the post state after any reload */
  useEffect(() => {
    getAllPostsAction();
  }, [userId, getAllPostsAction]);
  /**take appropiate action follow,unfollow,edit profile  */
  const editFollowBtn = (e) => {
    switch (e.target.innerHTML) {
      case "Edit Profile":
        toggleManageProfile(true);
        break;
      case "Follow": {
        let userInfo = {
          userId: userId,
          updates: { followers: `${currentUserId}:follow` },
        };
        updateUserInfo(userInfo);
        break;
      }
      case "Unfollow":
        let userInfo = {
          userId: userId,
          updates: { followers: `${currentUserId}:unfollow` },
        };
        updateUserInfo(userInfo);
        break;
      default:
    }
  };
  /**save profile or update user info */
  const saveProfile = (updatedUserInfo) => {
    let toUpdate = updatedUserInfo;
    delete toUpdate.followers;
    delete toUpdate.userId;

    let userInfo = {
      userId: currentUserId,
      updates: {
        ...toUpdate,
      },
    };
    updateUserInfo(userInfo);
    toggleManageProfile(false);
  };
  /**cancel edit profile */
  const cancelEditProfile = () => {
    toggleManageProfile(false);
  };

  const uploadPicture = (event) => {
    console.log("uplaoding file");
    let data = new FormData();
    let types = event.target.name;
    data.append("userId", profile.userId);
    data.append("type", event.target.name);
    data.append("file", event.target.files[0]);
    let config = {
      method: "post",
      url: `${baseUrl}/api/v1/user/fileUpload?authToken=${localStorage.getItem(
        "authToken"
      )}`,
      data: data,
    };

    axios(config)
      .then(function (response) {
        if (response.data.message === "File Extension Not Allowed") {
          toast.error(response.data.message);
        }
        if (response.data.status === 200) {
          toast.success(`File upload Sucess`);
          updatePicture(types, response.data.data);
        }
      })
      .catch(function (error) {
        console.warn(error);
        toast.success(`File Upload Error`);
      });
  };
  /**update picture */
  const updatePicture = (fileType, uploadedfile) => {
    const userInfo = {
      type: fileType,
      file: uploadedfile,
    };
    updatePictures(userInfo);
  };
  /**update uploaded pictures */
  const updatePictures = (userInfo) => {
    updateUserPictures(userInfo);
  };
  return (
    <>
      <ProfilePresentation
        currentUser={currentUserId}
        userInfo={profile}
        handleGoBack={handleBackToTweets}
        handleShowTweets={handleTweets}
        tweets={tweets}
        tweetsReplies={tweetsReplies}
        mediaTweets={mediaTweets}
        likedTweets={likedTweets}
        showTweets={showTweets}
        showRelpiesTweets={showRelpiesTweets}
        showMediaTweets={showMediaTweets}
        showLikedTweets={showLikedTweets}
        activeTweetsTab={activeTweetsTab}
        handleBtnClick={editFollowBtn}
        handleManageProfile={showManageProfile}
        saveProfile={saveProfile}
        handleGoBackToProfile={cancelEditProfile}
        updatePictures={updatePictures}
        uploadPicture={uploadPicture}
      />
      <ToastContainer autoClose={1000} hideProgressBar />
    </>
  );
}
/**compute the tweets by the current user */
const getTweetsByUser = (posts, userId) => {
  return posts.filter((post) => post.userId === userId);
};
/**compute the replied to tweets by the current user */
const getTweetRepliesByUser = (posts, userId) => {
  return posts.filter((post) =>
    post.comments.length > 0
      ? post.comments.map((comment) => comment.userId === userId)
      : ""
  );
};
/**compute the pictures and videos tweeted by the current user */
const getUsersMediaTweets = (posts, userId) => {
  return posts.filter(
    (post) =>
      post.userId === userId && post.image !== undefined && post.image !== ""
  );
};
/**compute the liked tweets by the current user */
const getTweetsLikedByUser = (posts, userId) => {
  return posts.filter((post) => post.likedBy.includes(userId));
};

const mapStateToProps = (state, ownProps) => {
  const userId = ownProps.match.params.userId;
  const { profile } = state;
  const { posts } = state;
  const currentUserId = localStorage.getItem("userId");
  const tweets = getTweetsByUser(posts, userId);
  const tweetsReplies = getTweetRepliesByUser(posts, userId);
  const mediaTweets = getUsersMediaTweets(posts, userId);
  const likedTweets = getTweetsLikedByUser(posts, userId);
  return {
    userId,
    profile,
    posts,
    tweets,
    tweetsReplies,
    mediaTweets,
    likedTweets,
    currentUserId,
  };
};
const mapActionToProps = {
  getUserInfo,
  getAllPostsAction,
  updateUserInfo,
  updateUserPictures,
};
export default connect(mapStateToProps, mapActionToProps)(Profile);
