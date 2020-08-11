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
import { Button } from "@material-ui/core";
import "../App.css";
function SideBar() {
  return (
    <div>
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
  );
}
export default SideBar;
