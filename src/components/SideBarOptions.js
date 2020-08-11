import React from "react";
import "../App.css";

function SideBarOptions({ text, Icon, active }) {
  console.log(("active", active));
  return (
    <div className={`sideBarOptions ${active && "sideBarOptions--active"}`}>
      <Icon />
      <h2>{text}</h2>
    </div>
  );
}
export default SideBarOptions;
