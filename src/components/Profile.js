import React from "react";
import "../css/Profile.css";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SideBar from "./SideBar";
import Widgets from "./Widgets";
import { connect } from "react-redux";
import RoomIcon from "@material-ui/icons/Room";
import CakeIcon from "@material-ui/icons/Cake";
import EventNoteIcon from "@material-ui/icons/EventNote";
function Profile({ name, email, userId, username }) {
  let history = useHistory();
  /*const handleClick = () => {
    history.push("/tweets");
  };*/
  const handleBackToprofile = () => {
    history.goBack();
  };
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
                    onClick={handleBackToprofile}
                  />
                  <h3>{name}</h3>
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
                <p className="profile__header__username">saurabh</p>
                <p className="profile__header__userid">@sbhbp</p>
                <p className="profile__header__bio">You know who I am</p>
              </div>
              <div className="profile__header__otherinfo">
                <div>
                  <RoomIcon fontSize="small" />
                  <span className="otherinfo">India</span>
                </div>

                <div>
                  <CakeIcon fontSize="small" />
                  <span className="otherinfo"> Born April 26,1995</span>
                </div>

                <div>
                  <EventNoteIcon fontSize="small" />
                  <span className="otherinfo">Joined on April 26</span>
                </div>
              </div>
              <div className="profile__userinteraction">
                <div className="profile__user__following">
                  <p>
                    <span className="userinteraction__number">56</span>
                    <span className="userinteraction__span">Following</span>
                  </p>
                </div>
                <div className="profile__user__followers">
                  <p>
                    <span className="userinteraction__number">56</span>
                    <span className="userinteraction__span">Followers</span>
                  </p>
                </div>
                <div></div>
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
const mapStateToProps = ({ user }) => {
  const { name, email, userId, username } = user.user;
  return { name, email, userId, username };
};
const mapActionToProps = {};
export default connect(mapStateToProps, mapActionToProps)(Profile);
