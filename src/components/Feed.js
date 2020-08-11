import React from "react";
import "../css/Feed.css";
import TweetBox from "./TweetBox";
function Feed() {
  return (
    <div className="feed">
      <div className="feedHeader">
        <h2>Home</h2>
      </div>
      <TweetBox />
    </div>
  );
}
export default Feed;
