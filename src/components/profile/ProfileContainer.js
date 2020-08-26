import React, { useEffect } from "react";
import "../../css/Profile.css";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import ProfilePresentation from "./ProfilePresentation";
import { getUserInfo } from "../../redux/actions/userActions";
function Profile({ userId, getUserInfo, profile }) {
  let history = useHistory();
  const handleBackToTweets = () => {
    history.goBack();
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
      />
    </>
  );
}
const mapStateToProps = (state, ownProps) => {
  const userId = ownProps.match.params.userId;
  const { profile } = state;
  return { userId, profile };
};
const mapActionToProps = { getUserInfo };
export default connect(mapStateToProps, mapActionToProps)(Profile);
