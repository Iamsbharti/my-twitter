import React from "react";
import "../../css/Profile.css";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SideBar from "../SideBar";
import Widgets from "../Widgets";
import RoomIcon from "@material-ui/icons/Room";
import CakeIcon from "@material-ui/icons/Cake";
import EventNoteIcon from "@material-ui/icons/EventNote";
function ProfilePresentation({ userInfo, handleGoBack }) {
  let history = useHistory();
  console.log("porps from container::", userInfo);
  return (
    <>
      <div className="app">
        <SideBar />
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
                <div className="profile__coverpic">
                  <img
                    src={process.env.PUBLIC_URL + "/coverpic.jpeg"}
                    className="coverPic"
                    alt=""
                  />
                  <img
                    className="profile__user__avatar"
                    src={process.env.PUBLIC_URL + "/saurabh (2).jpg"}
                    alt=""
                  />
                  <Button>Edit Profile</Button>
                </div>
              </div>
              <div className="profile__header__userinfo">
                <p className="profile__header__username">{userInfo.name}</p>
                <p className="profile__header__userid">@{userInfo.username}</p>
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
                    userInfo.birthdate === undefined
                      ? "Not Updated"
                      : userInfo.birthdate}
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
                <div className="profile__tweets__bar">
                  <Button>Tweets</Button>
                </div>
                <div className="profile__tweets__bar">
                  <Button>Tweets & Replies</Button>
                </div>
                <div className="profile__tweets__bar">
                  <Button>Media</Button>
                </div>
                <div className="profile__tweets__bar">
                  <Button>Likes</Button>
                </div>
              </div>
            </>
          ) : (
            history.push("/login")
          )}
        </div>
        <Widgets />
      </div>
    </>
  );
}

export default ProfilePresentation;
