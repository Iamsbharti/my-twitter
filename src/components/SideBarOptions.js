import React from "react";
import "../css/SideBar.css";
import { useHistory } from "react-router-dom";
function SideBarOptions({ text, Icon, active }) {
  let history = useHistory();
  const handleBookMarks = () => {
    console.log("handle book marks");
    history.push("/bookmarks");
  };
  const dummy = () => {};
  return (
    <div
      className={`sideBarOptions ${active && "sideBarOptions--active"}`}
      onClick={text === "Booksmarks" ? handleBookMarks : dummy}
    >
      <Icon />
      <h2>{text}</h2>
    </div>
  );
}
export default SideBarOptions;
