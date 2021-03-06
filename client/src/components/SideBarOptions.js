import React from "react";
import "../css/SideBar.css";
import { useHistory } from "react-router-dom";
function SideBarOptions({ text, Icon, active }) {
  let history = useHistory();
  const handleSideOptionsClick = (text) => {
    console.log("click text::", text);
    switch (text) {
      case "Booksmarks":
        history.push("/bookmarks");
        break;
      case "Explore":
        console.log("opening explore page");
        history.push("/explore");
        break;
      case "Profile":
        console.log("opening profile page");
        history.push(`/profile/${localStorage.getItem("userId")}`);
        break;
      case "Home":
        console.log("opening home page");
        history.push("/tweets");
        break;
      case "More":
        console.log("opening more page");
        history.push("/more");
        break;
      case "Notifications":
        console.log("opening notifications page");
        history.push("/notifications");
        break;
      case "Messages":
        console.log("opening messages page");
        history.push("/messages");
        break;
      case "Lists":
        console.log("opening lists page");
        history.push("/lists");
        break;
      case "Logout":
        console.log("logging out");
        /**clear localstorage */
        localStorage.clear();
        setTimeout(() => history.push("/"), 1000);
        break;
      default:
    }
  };
  return (
    <div
      className={`sideBarOptions ${active && "sideBarOptions--active"}`}
      onClick={() => handleSideOptionsClick(text)}
    >
      <Icon />
      <h2>{text}</h2>
    </div>
  );
}
export default SideBarOptions;
