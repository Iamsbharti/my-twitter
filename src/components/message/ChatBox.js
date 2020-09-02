import React from "react";
import { Avatar, Button } from "@material-ui/core";
import EventNoteIcon from "@material-ui/icons/EventNote";
import SendIcon from "@material-ui/icons/Send";
import { getAllChatAction } from "../../redux/actions/chatAction";
import { connect } from "react-redux";
import dateFormat from "dateformat";
function ChatBox({ content, user, currentUserId, messageList }) {
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
              <h3>{user.name}</h3>
            </div>
            <div className="chat__header__username">
              <span>@{user.username}</span>
            </div>
          </div>

          <div className="chatbox__container">
            <div className="chatbox__userinfo">
              <div className="userinfo">
                <span className="userinfo__name">{user.name}</span>&nbsp; &nbsp;
                <span className="span__gray">@{user.username}</span>
              </div>
              <div className="user__followers__count">
                {user.followers && user.followers.length === 0
                  ? 0
                  : user.followers.length}{" "}
                &nbsp; <span className="span__gray">Following</span>
                &nbsp; &nbsp; {user.following && user.following}
                &nbsp;
                <span className="span__gray">Followers</span>
              </div>
              <div className="span__gray">
                <EventNoteIcon fontSize="small" />
                <span className="otherinfo">Joined April 26 2010</span>
                <p className="otherinfo__bio">{user.bio && user.bio}</p>
              </div>
            </div>
          </div>
          {content && messageList.length === 0 ? (
            <div className="user__chats">
              <p className="user_chat_no_msg">
                You haven't started conversation with <span>{user.name}</span>
                <p>Say Hi ...</p>
              </p>
            </div>
          ) : (
            messageList.map((msg) => (
              <div className="user__chats">
                <div className="sent__message">
                  <div className="message__sent">
                    {msg.senderId === currentUserId && <p>{msg.message}</p>}
                  </div>
                  <div className="msg__date__sent">
                    <p>{dateFormat(msg.createdAt, "h:MM TT.mmmm dS,yyyy")}</p>
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
                    {msg.senderId !== currentUserId && <p>{msg.message}</p>}
                  </div>
                  <div className="msg__date__recieved">
                    <p>{dateFormat(msg.createdAt, "h:MM TT.mmmm dS,yyyy")}</p>
                  </div>
                </div>
              </div>
            ))
          )}
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
const mapStateToProps = ({ user, chat }) => {
  console.log("chat:", chat);
  return { currentUserId: user.user.userId, messageList: chat };
};
const mapActionToProps = {
  getAllChatAction,
};
export default connect(mapStateToProps, mapActionToProps)(ChatBox);
