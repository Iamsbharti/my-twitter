import React, { useEffect } from "react";
import "../css/Feed.css";
import TweetBox from "./TweetBox";
import Post from "./Post";
import { connect } from "react-redux";
import {
  createPostAction,
  getAllPostsAction,
} from "../redux/actions/postAction";
import { useHistory } from "react-router-dom";
function Feed({
  isAuthenticated,
  userId,
  name,
  username,
  posts,
  getAllPostsAction,
  createPostAction,
}) {
  /**define state */
  let history = useHistory();
  useEffect(() => {
    console.log("userId in Feed::", userId);
    /**call get posts action */
    getAllPostsAction(userId);
  }, [userId]);
  /**tweet */
  const tweet = (text, image) => {
    console.log("text::", text, image);
    let newTweetInfo = {
      description: text,
      displayName: name,
      userId: userId,
      userName: username,
    };
    console.log("tweet::", newTweetInfo);
    createPostAction(newTweetInfo);
  };
  return (
    <div className="feed">
      {isAuthenticated ? (
        <>
          <div className="feedHeader">
            <h2>Home</h2>
          </div>
          <TweetBox postTweet={tweet} />
          {posts.map((post, index) => (
            <Post key={index} info={post} />
          ))}
        </>
      ) : (
        history.push("/login")
      )}
    </div>
  );
}
const mapStateToProps = ({ posts, user }) => {
  let { userId, isAuthenticated, name, username } = user.user;
  return { posts, userId, isAuthenticated, name, username };
};
const mapActionToProps = { createPostAction, getAllPostsAction };
export default connect(mapStateToProps, mapActionToProps)(Feed);
