import React from "react";
import "../css/TweetBox.css";
import { Avatar, Button } from "@material-ui/core";
function TweetBox() {
  return (
    <div className="tweetbox">
      <form>
        <div className="tweet--input">
          <Avatar src={process.env.PUBLIC_URL + "/saurabh (2).jpg"}></Avatar>
          <input placeholder="What's happening?" type="text" />
        </div>
      </form>
      <Button>Tweet</Button>
    </div>
  );
}
export default TweetBox;
