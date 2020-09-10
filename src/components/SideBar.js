import React, { useState } from "react";
import Homeicon from "@material-ui/icons/Home";
import Searchicon from "@material-ui/icons/Search";
import NotificationsNoneicon from "@material-ui/icons/NotificationsNone";
import Emailicon from "@material-ui/icons/Email";
import BookmarkBordericon from "@material-ui/icons/BookmarkBorder";
import ListAlticon from "@material-ui/icons/ListAlt";
import PermIdentityicon from "@material-ui/icons/PermIdentity";
import MoreHorizicon from "@material-ui/icons/MoreHoriz";
import SideBarOptions from "./SideBarOptions";
import { useHistory } from "react-router-dom";

import "../css/SideBar.css";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
function SideBar({ userInfo }) {
  let history = useHistory();
  const [logoutMsg, setLogMsg] = useState();
  const [isLoggingOut, setIsLogout] = useState(false);
  const handleLogout = () => {
    /**clear localstorage */
    localStorage.clear();
    setIsLogout(true);
    setLogMsg("Logging off see you soon!!...");
    setTimeout(() => history.push("/"), 3000);
  };
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
        <Button
          className="sidebar__logout"
          variant="outlined"
          fullWidth
          onClick={handleLogout}
        >
          Logout
        </Button>
        {isLoggingOut && <p className="sidebar__logout_span">{logoutMsg}</p>}
      </div>
    </>
  );
}
const mapStateToProps = ({ user }) => {
  return { userInfo: user.user };
};
export default connect(mapStateToProps)(SideBar);
