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
            <div className="icon__items">
              <ChatBubbleOutlineIcon
                className="icons"
                onClick={() => SetToggle(!toggleComment)}
                fontSize="small"
              />
              {info.comments.length > 0 && <p>{info.comments}</p>}
            </div>
            <div className="icon__items">
              <RepeatIcon className="icons" fontSize="small" />
              {info.retweets > 0 && <p>{info.retweets}</p>}
            </div>
            <div className="icon__items">
              <FavoriteBorderIcon className="icons" fontSize="small" />
              {info.likes > 0 && <p>{info.likes}</p>}
            </div>
            <div className="icon__items">
              <PublishIcon className="icons" fontSize="small" />
              {info.shares > 0 && <p>{info.shares}</p>}
            </div>
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
