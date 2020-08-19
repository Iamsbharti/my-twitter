import React, { useState } from "react";
import "../css/Comments.css";
import { Avatar, Button } from "@material-ui/core";
import PublishIcon from "@material-ui/icons/Publish";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import DeleteIcon from "@material-ui/icons/Delete";
import RepeatIcon from "@material-ui/icons/Repeat";
import { connect } from "react-redux";
import {
  updatePostAction,
  deletePostAction,
} from "../redux/actions/postAction";
import { useHistory } from "react-router-dom";

function Comments({
  info,
  updatePostAction,
  deletePostAction,
  userId,
  status,
}) {
  /**define stated */
  const [toggleComment, SetToggle] = useState(true);
  const [comment, setComment] = useState("");
  const handleAddReply = () => {
    console.log("handle add reply");
    SetToggle(!toggleComment);
    tweetsUpdate("comments");
  };
  console.log("postId-userid::", userId, info.userId);
  /**invoke func of parent component for updates*/
  const tweetsUpdate = (updateType) => {
    console.log("tweets updates invoked in Post ", updateType);
    let updateOptions = { postId: info.postId };
    switch (updateType) {
      case "comments":
        updateOptions = { ...updateOptions, update: { comments: comment } };
        break;
      case "retweets":
        updateOptions = { ...updateOptions, update: { retweets: 1 } };
        break;
      case "likes":
        updateOptions = { ...updateOptions, update: { likes: 1 } };
        break;
      case "shares":
        updateOptions = { ...updateOptions, update: { shares: 1 } };
        break;
      default:
        break;
    }
    updatePostAction(updateOptions);
  };
  /**invoke func of parent component for deletion*/
  const tweetDelete = (postId) => {
    console.log("delete tweet invoke --post::", postId);
    deletePostAction(postId);
  };
  /**open a single tweet with comments upon click */
  let history = useHistory();
  const handlePostClick = (username, postid) => {
    console.log("handle post clicks__routing to manage tweet");
    history.push(`/${username}/status/${postid}`);
  };
  return (
    <>
      <div className="comment">
        <div className="comment__avatar">
          <Avatar src={process.env.PUBLIC_URL + "/logo512.png"}></Avatar>
        </div>
        <div className="comment__body">
          <div
            className="comment__header"
            onClick={() => handlePostClick(info.userName, info.postId)}
          >
            <div className="comment__headerText">
              <h3>
                {info.displayName}{" "}
                <span className="comment__verified">
                  <img
                    src={process.env.PUBLIC_URL + "/verified.png"}
                    alt=""
                    className="comment__badge"
                  />
                  @{info.userName}
                </span>
              </h3>
              {userId === info.userId && (
                <div className="headerDeleteIcon">
                  <span>
                    <DeleteIcon
                      fontSize="small"
                      onClick={() => tweetDelete(info.postId)}
                    />
                  </span>
                </div>
              )}
            </div>

            <div className="comment_headerDescription">
              <p>{info.description}</p>
            </div>
          </div>

          {info.image && <img src={info.image} alt="" />}
          <div className="comment__footer">
            <div className="icon__items">
              <ChatBubbleOutlineIcon
                className="icons"
                onClick={() => SetToggle(!toggleComment)}
                fontSize="small"
              />
              {info.comments && info.comments.length > 0 && (
                <p>{info.comments.length}</p>
              )}
            </div>
            <div className="icon__items">
              <RepeatIcon
                fontSize="small"
                className="icons"
                onClick={() => tweetsUpdate("retweets")}
              />
              {info.retweets > 0 && <p>{info.retweets}</p>}
            </div>
            <div className="icon__items">
              <FavoriteBorderIcon
                className="icons"
                fontSize="small"
                onClick={() => tweetsUpdate("likes")}
              />
              {info.likes > 0 && <p>{info.likes}</p>}
            </div>
            <div className="icon__items">
              <PublishIcon
                className="icons"
                fontSize="small"
                onClick={() => tweetsUpdate("shares")}
              />
              {info.shares > 0 && <p>{info.shares}</p>}
            </div>
          </div>

          <div className="comment__comments" hidden={toggleComment}>
            <input
              type="text"
              placeholder="Tweet your reply"
              onChange={(e) => setComment(e.target.value)}
            />
            <Button onClick={handleAddReply}>Reply</Button>
          </div>
        </div>
      </div>
      {
        <div className="tweet__status__comments">
          {status &&
            info.comments &&
            info.comments.map((c, index) => (
              <p key={index} className="comment_single_comments">
                {c.description}-- @{c.userName}
              </p>
            ))}
        </div>
      }
    </>
  );
}
const mapStateToProps = ({ user }) => {
  console.log("state-user in Comment");
  return { userId: user.user.userId };
};
const mapActionToProps = {
  updatePostAction,
  deletePostAction,
};
export default connect(mapStateToProps, mapActionToProps)(Comments);
