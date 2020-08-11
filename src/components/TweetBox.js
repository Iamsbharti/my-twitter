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
          <input
            lassName="tweet--inputImage"
            placeholder="Enter image URL"
            type="text"
          />
        </div>
        <Button className="tweetBox-button">Tweet</Button>
      </form>
    </div>
  );
}
export default TweetBox;
