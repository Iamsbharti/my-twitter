import React from "react";
import "../../css/Message.css";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Sidebar from "../SideBar";
import ChatBox from "./ChatBox";
import PeopleList from "./PeopleList";
function Messages() {
  let history = useHistory();
  const handleClick = () => {
    history.push("/tweets");
  };
  return (
    <div className="app">
      <Sidebar />
      <PeopleList />
    </div>
  );
}
export default Messages;
