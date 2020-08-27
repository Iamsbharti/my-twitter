import React, { useEffect, useState } from "react";
import "../../css/Profile.css";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import ProfilePresentation from "./ProfilePresentation";
import { getUserInfo } from "../../redux/actions/userActions";
function Profile({
  userId,
  getUserInfo,
  profile,
  tweets,
  tweetsReplies,
  mediaTweets,
  likedTweets,
}) {
  const [toggleTweetsInfo, setToggleTweets] = useState(true);
  const [tweetsToDisplay, setTweetsDisp] = useState([]);
  let history = useHistory();
  const handleBackToTweets = () => {
    history.goBack();
  };
  const handleTweets = (e) => {
    console.log("Handle--", e.target.innerHTML);
    switch (e.target.innerHTML) {
      case "Tweets":
        setTweetsDisp(tweets);
        setToggleTweets(!toggleTweetsInfo);
        break;
      case "Tweets &amp; Replies":
        setTweetsDisp(tweetsReplies);
        setToggleTweets(!toggleTweetsInfo);
        break;
      case "Media":
        setTweetsDisp(mediaTweets);
        setToggleTweets(!toggleTweetsInfo);
        break;
      case "Likes":
        setTweetsDisp(likedTweets);
        setToggleTweets(!toggleTweetsInfo);
        break;
      default:
        break;
    }
  };
  /**call get user info api */
  useEffect(() => {
    getUserInfo(userId);
  }, [userId, getUserInfo]);
  return (
    <>
      <ProfilePresentation
        userInfo={profile}
        handleGoBack={handleBackToTweets}
        handleShowTweets={handleTweets}
        showTweetsDiv={toggleTweetsInfo}
        usersTweets={tweetsToDisplay}
      />
    </>
  );
}
const getTweetsByUser = (posts, userId) => {
  return posts.filter((post) => post.userId === userId);
};
const getTweetRepliesByUser = (posts, userId) => {
  return posts.filter((post) =>
    post.comments.length > 0
      ? post.comments.map((comment) => comment.userId === userId)
      : ""
  );
};
const getUsersMediaTweets = (posts, userId) => {
  return posts.filter(
    (post) =>
      post.userId === userId && post.image !== undefined && post.image !== ""
  );
};
const getTweetsLikedByUser = (posts, userId) => {
  return posts.filter((post) => post.likedBy.includes(userId));
};

const mapStateToProps = (state, ownProps) => {
  const userId = ownProps.match.params.userId;
  const { profile } = state;
  const { posts } = state;
  //console.log("posts:", posts);
  const tweets = getTweetsByUser(posts, userId);
  const tweetsReplies = getTweetRepliesByUser(posts, userId);
  const mediaTweets = getUsersMediaTweets(posts, userId);
  const likedTweets = getTweetsLikedByUser(posts, userId);
  console.log("tweets::", tweets);
  console.log("tweetsReplies::", tweetsReplies);
  console.log("mediaTweets::", mediaTweets);
  console.log("likedTweets::", likedTweets);
  return { userId, profile, tweets, tweetsReplies, mediaTweets, likedTweets };
};
const mapActionToProps = { getUserInfo };
export default connect(mapStateToProps, mapActionToProps)(Profile);
