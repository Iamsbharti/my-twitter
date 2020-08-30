import React from "react";
import { Avatar, Button } from "@material-ui/core";
import EventNoteIcon from "@material-ui/icons/EventNote";
import SendIcon from "@material-ui/icons/Send";
function ChatBox({ content }) {
  return (
    <div className="chatbox">
      {!content ? (
        <div className="chatbox__init__content">
          <h3>You don’t have a message selected</h3>
          <p>Choose one from your existing messages.</p>
        </div>
      ) : (
        <>
          <div className="peoplelistHeader">
            <div className="chat__header">
              <Avatar
                src={process.env.PUBLIC_URL + "/saurabh (2).jpg"}
              ></Avatar>
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
          <div className="user__chats">
            <div className="sent__message">
              <div className="message__sent">
                <p>Hifsdfsdfsdfsdsdfsdfsdf</p>
              </div>
              <div className="msg__date__sent">
                <p>26/07/ 5:67:00</p>
              </div>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            {/**recieved__message */}
            <div className="recieved__message">
              <div className="message__recieved">
                <p>Hifsdfsdfsdfsdsdfsdfsdf</p>
              </div>
              <div className="msg__date__recieved">
                <p>26/07/ 5:67:00</p>
              </div>
            </div>
          </div>
          <div className="send__chat">
            <input placeholder="write your message" />
            <div className="send__icon">
              <SendIcon fontSize="small" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default ChatBox;
