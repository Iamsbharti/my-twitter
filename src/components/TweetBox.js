import React, { useState } from "react";
import "../css/TweetBox.css";
import { Avatar, Button } from "@material-ui/core";
import GifIcon from "@material-ui/icons/Gif";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import Chip from "@material-ui/core/Chip";
import CloudDoneIcon from "@material-ui/icons/CloudDone";
import { connect } from "react-redux";
import { baseUrl } from "../apis/apiUtils";

function TweetBox({ postTweet, profile }) {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [postImage, setPostImage] = useState(undefined);
  const [isImageLoaded, setImageLoad] = useState(false);

  /**tweet */
  const handleTweet = (e) => {
    console.log("handle tweet", text, image, postImage);
    e.preventDefault();
    postTweet(text, image, postImage);
    /**clear input  */
    setTimeout(() => {
      setText("");
      setImage("");
    }, 1400);
  };
  const handleFileChange = (event) => {
    setPostImage(event.target.files[0]);
    setImageLoad(true);
  };
  const deletepostImage = () => {
    setPostImage(undefined);
    setImageLoad(!isImageLoaded);
  };
  return (
    <div className="tweetbox">
      <form onSubmit={handleTweet}>
        <div className="tweet--input">
          <Avatar
            src={
              profile &&
              `${baseUrl}/api/v1/user/fetchPicture?filename=${
                profile.filename
              }&authToken=${localStorage.getItem("authToken")}`
            }
          ></Avatar>
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
        <div className="icon">
          <a
            href="https://giphy.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GifIcon fontSize="large" className="gifIcon" />
          </a>
          <div className="upload_cover">
            <label htmlFor="postimage-upload" className="custom-file-upload">
              <InsertPhotoIcon />
            </label>
            <input
              id="postimage-upload"
              type="file"
              name="postImage"
              onChange={handleFileChange}
            />
          </div>
        </div>
        {isImageLoaded && (
          <div className="uploaded__icon">
            <Chip
              variant="outlined"
              size="medium"
              icon={<CloudDoneIcon />}
              label="Image Uploaded"
              onDelete={deletepostImage}
              color="primary"
            />
          </div>
        )}
        <Button
          className="tweetBox-button"
          type="submit"
          disabled={text || image || postImage ? false : true}
        >
          Tweet
        </Button>
      </form>
    </div>
  );
}
const mapStateToProps = ({ user }) => {
  const { profile } = user.user;
  return { profile };
};
export default connect(mapStateToProps)(TweetBox);
