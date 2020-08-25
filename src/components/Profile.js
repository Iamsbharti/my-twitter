import React from "react";
import "../css/Profile.css";
import { Button, Avatar } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SideBar from "./SideBar";
import Widgets from "./Widgets";
import { connect } from "react-redux";
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
