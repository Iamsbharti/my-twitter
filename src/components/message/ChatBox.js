import React from "react";
import { Avatar, Button } from "@material-ui/core";
import EventNoteIcon from "@material-ui/icons/EventNote";
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

      <div className="chatbox__container">
        <div className="chatbox__userinfo">
          <div className="userinfo">
            <span className="userinfo__name">John Wick</span>&nbsp; &nbsp;
            <span className="span__gray">@wicky</span>
          </div>
          <div className="user__followers__count">
            50 &nbsp; <span className="span__gray">Following</span>
            &nbsp; &nbsp; 56 &nbsp;
            <span className="span__gray">Followers</span>
          </div>
          <div className="span__gray">
            <EventNoteIcon fontSize="small" />
            <span className="otherinfo">Joined April 26 2010</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ChatBox;
