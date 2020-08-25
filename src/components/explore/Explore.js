import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllPostsAction } from "../../redux/actions/postAction";
import SideBar from "../SideBar";
import Widgets from "../Widgets";
import HashTagsFeed from "./HashTagsFeed";
function Explore({ userId, tweetCountArray, getAllPostsAction }) {
  useEffect(() => {
    /**call get allpost for each reload */
    getAllPostsAction();
  }, [userId, getAllPostsAction]);
  return (
    <div className="app">
      <SideBar />
      <HashTagsFeed hashTagsArray={tweetCountArray} />
      <Widgets />
    </div>
  );
}
const getUserNameMaptoTags = (posts, tag) => {
  /**declare a set to store unique username related to a hashtag */
  let username = new Set();
  let users = posts.filter((post) => post.hashTags.includes(tag));
  /**iterate over users array and get displaynames */
  users.map((usr) => username.add(usr.displayName));
  return username;
};
const getFinalTrendsString = (users) => {
  switch (users.length) {
    case 1:
      return users.join(",") + " is talking about this";
    case 2:
      return users[0] + " and " + users[1] + " are talking about this";
    default:
      return (
        users[0] +
        "," +
        users[1] +
        `, and ${users.length - 2} ${
          users.length - 2 > 1 ? `others are` : `other is`
        } talking about this`
      );
  }
};
const mapStateToProps = ({ user, posts }) => {
  /**get all hashtags */
  let hashTags = posts.map((post) => post.hashTags).toString();
  /**count the hashtags and hence its no of uses */
  let tweetCountMap = new Map();
  let count = 1;
  hashTags
    .split(",")
    .map((tag) =>
      tweetCountMap.get(tag)
        ? tweetCountMap.set(tag, tweetCountMap.get(tag) + 1)
        : tweetCountMap.set(tag, count)
    );
  console.log("tweetcountmap,", tweetCountMap);
  /**create an array of tags and related info */
  let tweetCountArray = [];
  [...tweetCountMap.keys()].map((key) =>
    tweetCountArray.push({
      tag: key,
      count: tweetCountMap.get(key),
      name: [...getUserNameMaptoTags(posts, key)],
    })
  );
  /**format the usernames in the gererated array*/
  tweetCountArray = tweetCountArray.map((val) => ({
    ...val,
    name: getFinalTrendsString(val.name),
  }));
  console.log("tweetcountarray::", tweetCountArray);

  return { userId: user.userId, tweetCountArray };
};
const mapActionToProps = {
  getAllPostsAction,
};
export default connect(mapStateToProps, mapActionToProps)(Explore);
