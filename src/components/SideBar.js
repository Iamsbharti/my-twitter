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
import TwitterIcon from "@material-ui/icons/Twitter";
function SideBar() {
  return (
    <div>
      <TwitterIcon />
      <SideBarOptions text="Home" Icon={Homeicon} />
      <SideBarOptions text="Explore" Icon={Searchicon} />
      <SideBarOptions text="Notifications" Icon={NotificationsNoneicon} />
      <SideBarOptions text="Messages" Icon={Emailicon} />
      <SideBarOptions text="Booksmarks" Icon={BookmarkBordericon} />
      <SideBarOptions text="Lists" Icon={ListAlticon} />
      <SideBarOptions text="Profile" Icon={PermIdentityicon} />
      <SideBarOptions text="More" Icon={MoreHorizicon} />
    </div>
  );
}
export default SideBar;
