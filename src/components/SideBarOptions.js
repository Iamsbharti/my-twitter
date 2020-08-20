import React from "react";
import "../css/SideBar.css";

function SideBarOptions({ text, Icon, active }) {
  return (
    <div className={`sideBarOptions ${active && "sideBarOptions--active"}`}>
      <Icon />
      <h2>{text}</h2>
    </div>
  );
}
export default SideBarOptions;
