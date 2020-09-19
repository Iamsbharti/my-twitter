import React, { useState, useEffect } from "react";
import "../../css/Profile.css";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SideBar from "../SideBar";
import Widgets from "../Widgets";
import RoomIcon from "@material-ui/icons/Room";
import CakeIcon from "@material-ui/icons/Cake";
import EventNoteIcon from "@material-ui/icons/EventNote";
import dateFormat from "dateformat";
import Post from "../Post";
import ManageProfile from "./ManageProfile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../apis/apiUtils";

function ProfilePresentation({
  currentUser,
  userInfo,
  handleGoBack,
  handleShowTweets,
  showTweets,
  showRelpiesTweets,
  showMediaTweets,
  showLikedTweets,
  tweets,
  tweetsReplies,
  mediaTweets,
  likedTweets,
  activeTweetsTab,
  handleBtnClick,
  handleManageProfile,
  saveProfile,
  handleGoBackToProfile,
  updatePictures,
  uploadPicture,
}) {
  let history = useHistory();
  const [btnText, setBtnText] = useState();
  useEffect(() => {
    if (currentUser === userInfo.userId) {
      setBtnText("Edit Profile");
    } else if (
      userInfo.followers.length > 0 &&
      userInfo.followers.includes(currentUser)
    ) {
      setBtnText("Unfollow");
    } else {
      setBtnText("Follow");
    }
  }, [currentUser, userInfo]);

  return (
    <>
      <div className="app">
        <SideBar />
        {handleManageProfile ? (
          <ManageProfile
            handleGoBackToProfile={handleGoBackToProfile}
            userInfo={userInfo}
            handleSaveProfile={saveProfile}
            handleUpdatePictures={updatePictures}
            uploadPicture={uploadPicture}
          />
        ) : (
          <div className="profile">
            {localStorage.getItem("authToken") ? (
              <>
                <div className="profileHeader">
                  <div className="status__header">
                    <ArrowBackIcon
                      fontSize="large"
                      className="status__icon"
                      onClick={handleGoBack}
                    />
                    <h3>{userInfo.name}</h3>
                  </div>
                  <div className="status__header__tweetcount">
                    <p>
                      <span>{userInfo.tweetsCount} Tweets</span>
                    </p>
                  </div>
                  <div className="profile__coverpic">
                    <img
                      src={
                        userInfo.coverPicture &&
                        `${baseUrl}/api/v1/user/fetchPicture?filename=${
                          userInfo.coverPicture.filename
                        }&authToken=${localStorage.getItem("authToken")}`
                      }
                      className="coverPic"
                      alt="cover pic"
                    />

                    <img
                      className="profile__user__avatar"
                      src={
                        userInfo.profile &&
                        `${baseUrl}/api/v1/user/fetchPicture?filename=${
                          userInfo.profile.filename
                        }&authToken=${localStorage.getItem("authToken")}`
                      }
                      alt=""
                    />

                    <Button className="btn" onClick={handleBtnClick}>
                      {btnText}
                    </Button>
                  </div>
                </div>
                <div className="profile__header__userinfo">
                  <p className="profile__header__username">{userInfo.name}</p>
                  <p className="profile__header__userid">
                    @{userInfo.username}
                  </p>
                  <p className="profile__header__bio">{userInfo.bio}</p>
                </div>
                <div className="profile__header__otherinfo">
                  <div>
                    <RoomIcon fontSize="small" />
                    <span className="otherinfo">{userInfo.country}</span>
                  </div>

                  <div>
                    <CakeIcon fontSize="small" />
                    <span className="otherinfo">
                      {" "}
                      {userInfo.birthdate === "" ||
                      userInfo.birthdate === undefined ||
                      userInfo.birthdate === null
                        ? "Not Updated"
                        : dateFormat(
                            new Date(userInfo.birthdate),
                            "mmmm  dd,  yyyy"
                          )}
                    </span>
                  </div>

                  <div>
                    <EventNoteIcon fontSize="small" />
                    <span className="otherinfo">Joined on April 26</span>
                  </div>
                </div>
                <div className="profile__userinteraction">
                  <div className="profile__user__following">
                    <p>
                      <span className="userinteraction__number">
                        {userInfo.following}
                      </span>
                      <span className="userinteraction__span">Following</span>
                    </p>
                  </div>
                  <div className="profile__user__followers">
                    <p>
                      <span className="userinteraction__number">
                        {userInfo.followers.length}
                      </span>
                      <span className="userinteraction__span">Followers</span>
                    </p>
                  </div>
                </div>

                <div className="profile__user__tweets__bar">
                  <div
                    className={`profile__tweets__bar ${
                      !showTweets && "profile__tweets__bar__selected"
                    } `}
                  >
                    <Button onClick={handleShowTweets}>Tweets</Button>
                  </div>
                  <div
                    className={`profile__tweets__bar ${
                      !showRelpiesTweets && "profile__tweets__bar__selected"
                    } `}
                  >
                    <Button onClick={handleShowTweets}>Tweets & Replies</Button>
                  </div>
                  <div
                    className={`profile__tweets__bar ${
                      !showMediaTweets && "profile__tweets__bar__selected"
                    } `}
                  >
                    <Button onClick={handleShowTweets}>Media</Button>
                  </div>
                  <div
                    className={`profile__tweets__bar ${
                      !showLikedTweets && "profile__tweets__bar__selected"
                    } `}
                  >
                    <Button onClick={handleShowTweets}>Likes</Button>
                  </div>
                </div>
                <div className="userInfo_tweets" hidden={showTweets}>
                  {tweets && tweets.length > 0 ? (
                    tweets.map((tweet, index) => (
                      <Post key={index} info={tweet} status={false} />
                    ))
                  ) : (
                    <h3>You haven't posted any tweets</h3>
                  )}
                </div>
                <div className="userInfo_tweets" hidden={showRelpiesTweets}>
                  {tweetsReplies && tweetsReplies.length > 0 ? (
                    tweetsReplies.map((tweet, index) => (
                      <Post
                        key={index}
                        info={tweet}
                        status={false}
                        profilecomments={true}
                      />
                    ))
                  ) : (
                    <h3>You haven't replied to any tweet</h3>
                  )}
                </div>
                <div className="userInfo_tweets" hidden={showMediaTweets}>
                  {mediaTweets && mediaTweets.length > 0 ? (
                    mediaTweets.map((tweet, index) => (
                      <Post key={index} info={tweet} status={false} />
                    ))
                  ) : (
                    <h3>You don't have any tweets with media</h3>
                  )}
                </div>
                <div className="userInfo_tweets" hidden={showLikedTweets}>
                  {likedTweets && likedTweets.length > 0 ? (
                    likedTweets.map((tweet, index) => (
                      <Post key={index} info={tweet} status={false} />
                    ))
                  ) : (
                    <h3>You haven't liked any Tweets</h3>
                  )}
                </div>
              </>
            ) : (
              history.push("/login")
            )}
            <ToastContainer autoClose={1000} hideProgressBar />
          </div>
        )}
        <Widgets />
      </div>
    </>
  );
}

export default ProfilePresentation;
