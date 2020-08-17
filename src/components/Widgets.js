import React from "react";
import "../css/Widgets.css";
import Searchicon from "@material-ui/icons/Search";
import { Button } from "@material-ui/core";
import { TwitterTweetEmbed } from "react-twitter-embed";
import { useHistory } from "react-router-dom";
function Widgets() {
  let history = useHistory();
  const handleLogout = () => {
    /**clear localstorage */
    localStorage.clear();
    setTimeout(() => history.push("/home"), 1000);
  };
  return (
    <div className="widgets">
      <div className="widgets__input">
        <Searchicon className="widgets__search" />
        <input placeholder="Searh twitter" type="text" />
      </div>
      <Button onClick={handleLogout}>Logout</Button>
      <div className="widgets__container">
        <h2>What's Happening</h2>
        <TwitterTweetEmbed tweetId={"840430824289906688"} />
        <TwitterTweetEmbed tweetId={"1294176141440319488"} />
        <TwitterTweetEmbed tweetId={"834159901324754944"} />
        <div className="centerContent">
          <div className="selfCenter standardWidth">
            <TwitterTweetEmbed tweetId="1294785948325208064" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Widgets;
