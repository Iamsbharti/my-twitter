import React, { useState } from "react";
import "../css/Post.css";
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
  addCommentAction,
} from "../redux/actions/postAction";
import { useHistory } from "react-router-dom";
import Comments from "./Comments";
import dateFormat from "dateformat";
function Post({
  info,
  updatePostAction,
  deletePostAction,
  addCommentAction,
  userId,
  username,
  name,
  status,
}) {
  /**define stated */
  const [toggleComment, SetToggle] = useState(true);
  const [comment, setComment] = useState("");
  const handleAddReply = () => {
    setComment("");
    SetToggle(!toggleComment);
    const { postId } = info;
    let updateOptions = {
      postId: postId,
      userId: userId,
      displayName: name,
      description: comment,
      userName: username,
    };
    addCommentAction(updateOptions);
  };
  /**invoke func of parent component for updates*/
  const tweetsUpdate = (updateType) => {
    let updateOptions = { postId: info.postId, isComment: false };
    switch (updateType) {
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
    deletePostAction(postId);
  };
  /**open a single tweet with comments upon click */
  let history = useHistory();
  const handlePostClick = (username, postid) => {
    history.push(`/${username}/status/${postid}`);
  };
  let postdate = info.createdAt;
  let dates = new Date(postdate);
  //"dddd, mmmm dS, yyyy, h:MM:ss TT"
  console.log(dateFormat(dates, "h:MM TT.mmmm dS,yyyy"));
  return (
    <>
      <div className="post">
        <div className="post__avatar">
          <Avatar src={process.env.PUBLIC_URL + "/logo512.png"}></Avatar>
        </div>
        <div className="post__body">
          <div
            className="post__header"
            onClick={() => handlePostClick(info.userName, info.postId)}
          >
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

            <div className="post_headerDescription">
              <p>{info.description}</p>
            </div>
          </div>

          {info.image && <img src={info.image} alt="" />}
          {status && (
            <div className="post__details">
              <p className="post_details__date">
                {dateFormat(info.createdAt, "h:MM TT.mmmm dS,yyyy")}
                &nbsp;&nbsp;&nbsp;
                <span>Twitter for Web</span>
              </p>
              <p className="post_details__info">
                {info.retweets} &nbsp;<span>Retweets</span>{" "}
                &nbsp;&nbsp;&nbsp;&nbsp;
                {info.likes} &nbsp;<span>Likes</span>
              </p>
            </div>
          )}
          <div className="post__footer">
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

          <div className="post__comments" hidden={toggleComment}>
            <input
              type="text"
              placeholder="Tweet your reply"
              onChange={(e) => setComment(e.target.value)}
            />
            <Button onClick={handleAddReply}>Reply</Button>
          </div>
        </div>
      </div>
      {/**render comments for this tweet */}
      {
        <div>
          {status &&
            info.comments &&
            info.comments.map((c, index) => (
              <div key={index} className="post_single_comments">
                <Comments info={c} userPost={info.userName} />
              </div>
            ))}
        </div>
      }
    </>
  );
}
const mapStateToProps = ({ user }) => {
  const { name, userId, username } = user.user;
  return { userId, username, name };
};
const mapActionToProps = {
  updatePostAction,
  deletePostAction,
  addCommentAction,
};
export default connect(mapStateToProps, mapActionToProps)(Post);
