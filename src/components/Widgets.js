import React from "react";
import "../css/Widgets.css";
import Searchicon from "@material-ui/icons/Search";
import { TwitterTweetEmbed } from "react-twitter-embed";
function Widgets() {
  return (
    <div className="widgets">
      <div className="widgets__input">
        <Searchicon className="widgets__search" />
        <input placeholder="Searh twitter" type="text" />
      </div>
      <div className="widgets__container">
        <h2>What's Happening</h2>
        <TwitterTweetEmbed tweetId={"1293368543363264512"} />
      </div>
    </div>
  );
}
export default Widgets;
