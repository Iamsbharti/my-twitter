import React, { useState } from "react";
import "../css/Post.css";
import { Avatar, Button } from "@material-ui/core";
import PublishIcon from "@material-ui/icons/Publish";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
function Post({ info }) {
  /**define stated */
  const [toggleComment, SetToggle] = useState(true);
  const handleAddReply = () => {
    console.log("handle add reply");
    SetToggle(!toggleComment);
  };
  return (
    <>
      <div className="post">
        <div className="post__avatar">
          <Avatar src={process.env.PUBLIC_URL + "/logo512.png"}></Avatar>
        </div>
        <div className="post__body">
          <div className="post__header">
            <div className="post__headerText">
              <h3>
                {info.displayName}{" "}
                <span className="post__verified">
                  <img
                    src={process.env.PUBLIC_URL + "/verified.png"}
                    alt=""
                    className="post__badge"
                  />
                  @{info.userName}
                </span>
              </h3>
            </div>
            <div className="post_headerDescription">
              <p>{info.description}</p>
            </div>
          </div>
          {info.image && <img src={info.image} alt="" />}
          <div className="post__footer">
            <ChatBubbleOutlineIcon
              className="icons"
              onClick={() => SetToggle(!toggleComment)}
              fontSize="small"
            />
            <RepeatIcon className="icons" fontSize="small" />
            <FavoriteBorderIcon className="icons" fontSize="small" />
            <PublishIcon className="icons" fontSize="small" />
          </div>
          <div className="post__comments" hidden={toggleComment}>
            <input type="text" placeholder="Tweet your reply" />
            <Button onClick={handleAddReply}>Reply</Button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Post;
