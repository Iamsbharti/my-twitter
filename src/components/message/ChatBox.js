import React from "react";
import { Avatar, Button } from "@material-ui/core";
function ChatBox() {
  return (
    <div className="chatbox">
      <div className="peoplelistHeader">
        <div className="chat__header">
          <Avatar src={process.env.PUBLIC_URL + "/saurabh (2).jpg"}></Avatar>
          <h3>John Wick</h3>
        </div>
        <div className="chat__header__username">
          <span>@wicky</span>
        </div>
      </div>

      <div className="chatbox__container"></div>
    </div>
  );
}
export default ChatBox;
