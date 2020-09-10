import React, { useState, useEffect } from "react";
import "../css/Widgets.css";
import Searchicon from "@material-ui/icons/Search";
import { TwitterTweetEmbed } from "react-twitter-embed";
import { connect } from "react-redux";
function Widgets({ user, post, profile }) {
  const tweetIds = [
    "1304113292676390914",
    "840430824289906688",
    "1294176141440319488",
    "1294785948325208064",
    "1304113679521255425",
    "1304061623854755841",
    "1304055197149229056",
    "1302148980365647872",
    "1303994264574074881",
    "1302789190699155468",
  ];
  const [displayTweets, setDispTweets] = useState([]);
  const [randomSelection, setRandom] = useState(
    Math.floor(Math.random() * 4) + 1
  );
  useEffect(() => {
    setDispTweets(tweetIds.splice(randomSelection + 1, randomSelection));

    return () => {
      setRandom(Math.floor(Math.random() * 4) + 1);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, post, profile, randomSelection]);
  return (
    <div className="widgets">
      <div className="widgets__input">
        <Searchicon className="widgets__search" />
        <input placeholder="Searh twitter" type="text" />
      </div>
      <div className="widgets__container">
        <h2>What's Happening</h2>
        {displayTweets.map((id, index) => (
          <TwitterTweetEmbed key={index} tweetId={id} />
        ))}
      </div>
    </div>
  );
}
const mapStateToProps = ({ user, post, profile }) => {
  return { user, post, profile };
};
export default connect(mapStateToProps)(Widgets);
