import React, { useState } from "react";
import "../css/TweetBox.css";
import { Avatar, Button } from "@material-ui/core";
import GifIcon from "@material-ui/icons/Gif";
function TweetBox({ postTweet }) {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  /**tweet */
  const handleTweet = (e) => {
    console.log("handle tweet", text, image);
    e.preventDefault();
    postTweet(text, image);
    /**clear input  */
    setTimeout(() => {
      setText("");
      setImage("");
    }, 1400);
  };

  return (
    <div className="tweetbox">
      <form onSubmit={handleTweet}>
        <div className="tweet--input">
          <Avatar src={process.env.PUBLIC_URL + "/saurabh (2).jpg"}></Avatar>
          <input
            placeholder="What's happening?"
            type="text"
            name="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <input
          className="tweet--inputImage"
          placeholder="Enter image URL"
          type="text"
          name="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <div className="gifIcon">
          <a
            href="https://giphy.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GifIcon fontSize="large" />
          </a>
        </div>
        <Button className="tweetBox-button" type="submit">
          Tweet
        </Button>
      </form>
    </div>
  );
}
export default TweetBox;
