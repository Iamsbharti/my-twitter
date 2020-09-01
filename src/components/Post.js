import React, { useState } from "react";
import "../css/Post.css";
import { Avatar, Button } from "@material-ui/core";
import PublishIcon from "@material-ui/icons/Publish";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import FavoriteIcon from "@material-ui/icons/Favorite";
import DeleteIcon from "@material-ui/icons/Delete";
import RepeatIcon from "@material-ui/icons/Repeat";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import { connect } from "react-redux";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import {
  updatePostAction,
  deletePostAction,
  addCommentAction,
} from "../redux/actions/postAction";
import { useHistory } from "react-router-dom";
import Comments from "./Comments";
import dateFormat from "dateformat";
import socket from "./message/socket";
function Post({
  info,
  updatePostAction,
  deletePostAction,
  addCommentAction,
  userId,
  username,
  name,
  status,
  profilecomments,
  posts,
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
    socket.emit("user_added_comment", updateOptions);
  };
  /**invoke func of parent component for updates*/
  const tweetsUpdate = (updateType) => {
    let updateOptions = {
      postId: info.postId,
      isComment: false,
      userId: userId,
    };
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
      case "dislike":
        updateOptions = { ...updateOptions, update: { likes: -1 } };
        break;
      case "bookUnMark":
        updateOptions = { ...updateOptions, update: { bookmark: false } };
        break;
      case "bookMark":
        updateOptions = { ...updateOptions, update: { bookmark: true } };
        break;
      default:
        break;
    }
    updatePostAction(updateOptions);
    /**emit event for real time notification */
    socket.emit("action_on_post", updateOptions);
  };
  /**invoke func of parent component for deletion*/
  const tweetDelete = (postId) => {
    deletePostAction(postId);
    if (status) {
      setTimeout(() => history.push("/tweets"), 1200);
    }
  };
  /**open a single tweet with comments upon click */
  let history = useHistory();
  const handlePostClick = (username, postid) => {
    history.push(`/${username}/status/${postid}`);
  };
  /**view profile */
  const handleViewProfile = (userId) => {
    history.push(`/profile/${userId}`);
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
                <span
                  className="post__headertext__name"
                  onClick={() => handleViewProfile(info.userId)}
                >
                  {info.displayName}
                </span>
                <span className="post__verified">
                  <img
                    src={process.env.PUBLIC_URL + "/verified.png"}
                    alt=""
                    className="post__badge"
                  />
                  @{info.userName}
                </span>
                {!status && (
                  <div>
                    {info.bookMarkedBy && info.bookMarkedBy.includes(userId) ? (
                      <span className="headerDropDown">
                        <BookmarkIcon
                          fontSize="small"
                          onClick={() => tweetsUpdate("bookUnMark")}
                        />
                      </span>
                    ) : (
                      <span className="headerDropDown">
                        <BookmarkBorderIcon
                          fontSize="small"
                          onClick={() => tweetsUpdate("bookMark")}
                        />
                      </span>
                    )}
                  </div>
                )}
              </h3>
              {status && userId === info.userId && (
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
          </div>
          <div onClick={() => handlePostClick(info.userName, info.postId)}>
            <div className="post_headerDescription">
              <p>
                {info.description.split(" ").map((desc, index) => (
                  <span
                    key={index}
                    style={{ color: desc.startsWith("#") ? "blue" : "" }}
                  >
                    {desc}{" "}
                  </span>
                ))}
              </p>
            </div>
            {info.image && <img src={info.image} alt="" />}
            {status && (
              <div className="post__details">
                <p className="post_details__date">
                  {dateFormat(new Date(info.createdAt), "h:MM TT.mmmm dS,yyyy")}
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
          </div>
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
      {
        <div>
          {profilecomments &&
            info.comments &&
            info.comments.map((c, index) => (
              <div key={index} className="post_single_comments">
                <Comments info={c} userPost={info.userName} status={false} />
              </div>
            ))}
        </div>
      }
    </>
  );
}
const mapStateToProps = ({ user, posts }) => {
  const { name, userId, username } = user.user;
  return { userId, username, name, posts };
};
const mapActionToProps = {
  updatePostAction,
  deletePostAction,
  addCommentAction,
};
export default connect(mapStateToProps, mapActionToProps)(Post);
