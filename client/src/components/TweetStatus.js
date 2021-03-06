import React from "react";
import SideBar from "./SideBar";
import Widgets from "./Widgets";
import Feed from "./Feed";
import "../App.css";
import { connect } from "react-redux";

function TweetStatus({ history, userId, post, ...props }) {
  return (
    <div className="app">
      <SideBar />
      <Feed tweetStatus={post} />
      <Widgets />
    </div>
  );
}
const mapStateToProps = (state, ownProps) => {
  const postId = ownProps.match.params.postId;
  let { user, posts } = state;
  let post;
  if (postId && posts.length > 0) {
    post = posts.find((twt) => twt.postId === postId);
  }
  return { userId: user.user.userId, post };
};

export default connect(mapStateToProps)(TweetStatus);
