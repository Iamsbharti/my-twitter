import React from "react";
import "../css/Post.css";
import { Avatar } from "@material-ui/core";
import PublishIcon from "@material-ui/icons/Publish";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
function Post({
  displayName,
  userName,
  verified,
  timestamp,
  text,
  image,
  avatar,
}) {
  return (
    <div className="post">
      <div className="post__avatar">
        <Avatar src={process.env.PUBLIC_URL + "/logo512.png"}></Avatar>
      </div>
      <div className="post__body">
        <div className="post__header">
          <div className="post__headerText">
            <h3>
              UserName{" "}
              <span className="post__verified">
                <img
                  src={process.env.PUBLIC_URL + "/verified.png"}
                  alt=""
                  className="post__badge"
                />
                @username
              </span>
            </h3>
          </div>
          <div className="post_headerDescription">
            <p>Challenge you </p>
          </div>
        </div>
        <img src={process.env.PUBLIC_URL + "/EfJKhHAXsAAlIFu.jpeg"} alt="" />
        <div className="post__footer">
          <ChatBubbleOutlineIcon fontSize="small" />
          <RepeatIcon fontSize="small" />
          <FavoriteBorderIcon fontSize="small" />
          <PublishIcon fontSize="small" />
        </div>
      </div>
    </div>
  );
}
export default Post;
