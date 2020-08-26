import React from "react";
import "../../css/Profile.css";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import ProfilePresentation from "./ProfilePresentation";
function Profile({ userInfo }) {
  let history = useHistory();
  /*const handleClick = () => {
    history.push("/tweets");
  };*/
  const handleBackToTweets = () => {
    history.goBack();
  };
  return (
    <>
      <ProfilePresentation
        userInfo={userInfo}
        handleGoBack={handleBackToTweets}
      />
    </>
  );
}
const mapStateToProps = ({ user }) => {
  const { name, email, userId, username } = user.user;
  const userInfo = {
    name,
    email,
    userId,
    username,
  };
  return { userInfo };
};
const mapActionToProps = {};
export default connect(mapStateToProps, mapActionToProps)(Profile);
