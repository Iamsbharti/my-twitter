import React from "react";
import "../../css/Message.css";

import Sidebar from "../SideBar";
import PeopleList from "./PeopleList";
function Messages() {
  return (
    <div className="app">
      <Sidebar />
      <PeopleList />
    </div>
  );
}
export default Messages;
