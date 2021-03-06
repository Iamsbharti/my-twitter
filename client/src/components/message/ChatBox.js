import React, { useState, useEffect, useRef } from "react";
import { Avatar } from "@material-ui/core";
import EventNoteIcon from "@material-ui/icons/EventNote";
import SendIcon from "@material-ui/icons/Send";
import {
  getAllChatAction,
  updateChatAction,
} from "../../redux/actions/chatAction";
import { connect } from "react-redux";
import dateFormat from "dateformat";
import socket from "./socket";
import { toast } from "react-toastify";
import { baseUrl } from "../../apis/apiUtils";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";

function ChatBox({
  content,
  user,
  currentUserId,
  currentName,
  messageList,
  updateChatAction,
}) {
  const [text, setTextMsg] = useState("");
  const messagesEndRef = useRef(null);
  /**route back to feed  */
  let history = useHistory();
  const handleBackToFeed = () => {
    history.goBack();
  };
  /**send message */
  const sendMessage = () => {
    let textMessagePayload = {
      senderId: currentUserId,
      senderName: currentName,
      recieverId: user.userId,
      recieverName: user.name,
      message: text,
    };
    /**emit new text message event */
    socket.emit("new_text", textMessagePayload);
    updateChatAction(textMessagePayload);
    setTextMsg("");
    scrollToBottom();
  };
  const scrollToBottom = () => {
    /*console.log(
      "setting scoll position::",
      messagesEndRef.current.scrollIntoView({
        block: "end",
        behavior: "smooth",
      })
    );*/
    console.log("messages ref:", messagesEndRef);
    if (messagesEndRef.current !== null) {
      messagesEndRef.current.scrollIntoView({
        block: "end",
        behavior: "smooth",
      });
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [messageList, messagesEndRef]);
  /**listen to new text events if any */
  useEffect(() => {
    socket.on(currentUserId, (data) => {
      toast.success(`${data.senderName} sent you a text`);
      updateChatAction(data);
    });
  }, [currentUserId, updateChatAction]);
  const handleEnterSendMessage = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="chatbox">
      <div className="chat__header__goback">
        <ArrowBackIcon
          fontSize="large"
          className="status__icon"
          onClick={handleBackToFeed}
        />
      </div>
      {!content ? (
        <div className="chatbox__init__content">
          <h3>You don’t have a message selected</h3>
          <p>Choose one from your existing messages.</p>
        </div>
      ) : (
        <>
          <div className="peoplelistHeader">
            <div className="chat__header">
              <div className="chat__responsive__goback">
                <ArrowBackIcon
                  fontSize="large"
                  className="status__icon"
                  onClick={handleBackToFeed}
                />
              </div>
              <Avatar
                src={
                  user.profile &&
                  `${baseUrl}/api/v1/user/fetchPicture?filename=${
                    user.profile.filename
                  }&authToken=${localStorage.getItem("authToken")}`
                }
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
              <div className="user_chat_no_msg">
                You haven't started conversation with <span>{user.name}</span>
                <p>Say Hi ...</p>
              </div>
            </div>
          ) : (
            <div className="user__chats">
              {messageList.map((msg, index) => (
                <div key={index}>
                  {msg.senderId === currentUserId && (
                    <div className="sent__message">
                      <div className="message__sent">
                        <div className="sent__text">{<p>{msg.message}</p>}</div>
                      </div>
                      <div className="msg__date__sent">
                        <p>{dateFormat(msg.createdAt, "h:MM TT")}</p>
                      </div>
                    </div>
                  )}
                  {/**recieved__message */}
                  {msg.senderId === user.userId && (
                    <div className="recieved__message">
                      <div className="message__recieved">
                        <div className="recieved__text">
                          {<p>{msg.message}</p>}
                        </div>
                      </div>
                      <div className="msg__date__recieved">
                        <p>{dateFormat(msg.createdAt, "h:MM TT")}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
          <div className="send__chat">
            <input
              type="text"
              placeholder="write your message"
              name="text_msg"
              value={text}
              autoFocus
              onChange={(e) => setTextMsg(e.target.value)}
              onKeyDown={handleEnterSendMessage}
            />
            <div className="send__icon">
              <SendIcon fontSize="small" onClick={sendMessage} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
const mapStateToProps = ({ user, chat }) => {
  console.log("chat:", chat);
  console.log("curent user::", user.user.userId);
  return {
    currentUserId:
      user.user.userId !== undefined
        ? user.user.userId
        : localStorage.getItem("userId"),
    currentName:
      user.user.name !== undefined
        ? user.user.name
        : localStorage.getItem("user"),
    messageList: chat,
  };
};
const mapActionToProps = {
  getAllChatAction,
  updateChatAction,
};
export default connect(mapStateToProps, mapActionToProps)(ChatBox);
