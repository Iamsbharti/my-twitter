import React from "react";
import Homeicon from "@material-ui/icons/Home";
import Searchicon from "@material-ui/icons/Search";
import NotificationsNoneicon from "@material-ui/icons/NotificationsNone";
import Emailicon from "@material-ui/icons/Email";
import BookmarkBordericon from "@material-ui/icons/BookmarkBorder";
import ListAlticon from "@material-ui/icons/ListAlt";
import PermIdentityicon from "@material-ui/icons/PermIdentity";
import MoreHorizicon from "@material-ui/icons/MoreHoriz";
import SideBarOptions from "./SideBarOptions";
import "../css/SideBar.css";
import { Button, Avatar } from "@material-ui/core";
import { connect } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import { baseUrl } from "../apis/apiUtils";
function SideBar({ userInfo }) {
  return (
    <>
      <div className="sidebar">
        <img
          className="icon--img"
          src={process.env.PUBLIC_URL + "/android-icon-96x96.png"}
          alt=""
        />
        <SideBarOptions text="Home" Icon={Homeicon} active />
        <SideBarOptions text="Explore" Icon={Searchicon} />
        <SideBarOptions text="Notifications" Icon={NotificationsNoneicon} />
        <SideBarOptions text="Messages" Icon={Emailicon} />
        <SideBarOptions text="Booksmarks" Icon={BookmarkBordericon} />
        <SideBarOptions text="Lists" Icon={ListAlticon} />
        <SideBarOptions text="Profile" Icon={PermIdentityicon} />
        <SideBarOptions text="More" Icon={MoreHorizicon} />
        <Button className="sidebar__tweet" variant="outlined" fullWidth>
          Tweet
        </Button>
      </div>
      {/*<div>
        <div className="sidebar__responsive">
          <div className="sidebar_responsive_header">
            <p>Account info</p>
            <span>
              <CloseIcon />
            </span>
          </div>
          <div className="sidebar_responsive_avatar">
            <Avatar
              src={
                userInfo &&
                `${baseUrl}/api/v1/user/fetchPicture?filename=${
                  userInfo.profile.filename
                }&authToken=${localStorage.getItem("authToken")}`
              }
            ></Avatar>
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
          <Button className="sidebar__tweet" variant="outlined" fullWidth>
            Logout
          </Button>
        </div>
      </div>*/}
    </>
  );
}
const mapStateToProps = ({ user }) => {
  return { userInfo: user.user };
};
export default connect(mapStateToProps)(SideBar);
