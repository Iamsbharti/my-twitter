import React, { useState } from "react";
import "../css/Comments.css";
import { Avatar, Button } from "@material-ui/core";
import PublishIcon from "@material-ui/icons/Publish";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import DeleteIcon from "@material-ui/icons/Delete";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { connect } from "react-redux";
import {
  updatePostAction,
  deletePostAction,
  updatePostCommentAction,
  deleteCommentAction,
} from "../redux/actions/postAction";
import { useHistory } from "react-router-dom";
import { baseUrl } from "../apis/apiUtils";
function Comments({
  info,
  updatePostAction,
  deletePostAction,
  updatePostCommentAction,
  deleteCommentAction,
  userId,
  status,
  profilecomments,
  userPost,
  posts,
  currentUserProfile,
}) {
  /**define stated */
  const [toggleComment, SetToggle] = useState(true);
  const [comment, setComment] = useState("");
  const [commenterror, setError] = useState(true);
  const handleAddReply = () => {
    SetToggle(!toggleComment);
  };

  /**invoke func of parent component for updates*/
  const tweetsUpdate = (updateType) => {
    let updateOptions = {
      postId: info.commentId,
      isComment: true,
      userId: userId,
    };
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
      case "dislike":
        updateOptions = { ...updateOptions, update: { likes: -1 } };
        break;
      default:
        break;
    }
    updatePostCommentAction(updateOptions, info.postId);
  };
  /**invoke func of parent component for deletion*/
  const tweetDelete = (commentId, postId) => {
    let commentsInfo = {
      commentId: commentId,
      postId: postId,
    };
    deleteCommentAction(commentsInfo);
    if (status) {
      history.push("/tweets");
    }
  };
  /**open a single tweet with comments upon click */
  let history = useHistory();
  const handlePostClick = (username, postid) => {
    history.push(`/${username}/status/${postid}`);
  };
  return (
    <>
      <div className="comment">
        <div className="comment__avatar">
          {info.userId === userId ? (
            <Avatar
              src={
                info &&
                `${baseUrl}/api/v1/user/fetchPicture?filename=${
                  currentUserProfile.profile.filename
                }&authToken=${localStorage.getItem("authToken")}`
              }
            ></Avatar>
          ) : (
            <Avatar
              src={`${baseUrl}/api/v1/user/usersProfilePic?userId=${
                info.userId
              }&authToken=${localStorage.getItem("authToken")}`}
            ></Avatar>
          )}
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
                      onClick={() => tweetDelete(info.commentId, info.postId)}
                    />
                  </span>
                </div>
              )}
            </div>
            <div className="comment_replyto">
              Replying to <span>@{userPost}</span>
            </div>
            <div className="comment_headerDescription">
              <p>{info.description}</p>
            </div>
          </div>

          {info.image && <img src={info.image} alt="" />}
          <div className="comment__footer">
            {commenterror ? (
              <div className="icon__items">
                <ChatBubbleOutlineIcon
                  className="icons"
                  onClick={() => setError(false)}
                  fontSize="small"
                />
              </div>
            ) : (
              <div
                className="icon__comment__error"
                onClick={() => setError(true)}
              >
                <span>relpies are disabled</span>
              </div>
            )}
            <div className="icon__items">
              <RepeatIcon
                fontSize="small"
                className="icons"
                onClick={() => tweetsUpdate("retweets")}
                style={{
                  color:
                    info.retweetsBy && info.retweetsBy.includes(userId)
                      ? "Blue"
                      : "gray",
                }}
              />
              {info.retweets > 0 && <p>{info.retweets}</p>}
            </div>
            <div className="icon__items">
              {info.likedBy && info.likedBy.includes(userId) ? (
                <FavoriteIcon
                  className="icons like_icon"
                  fontSize="small"
                  onClick={() => tweetsUpdate("dislike")}
                />
              ) : (
                <FavoriteBorderIcon
                  className="icons like_icon"
                  fontSize="small"
                  onClick={() => tweetsUpdate("likes")}
                />
              )}
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
const mapStateToProps = ({ user, posts }) => {
  console.log("state-user in Comment");

  return { userId: user.user.userId, posts, currentUserProfile: user.user };
};
const mapActionToProps = {
  updatePostAction,
  deletePostAction,
  updatePostCommentAction,
  deleteCommentAction,
};
export default connect(mapStateToProps, mapActionToProps)(Comments);
