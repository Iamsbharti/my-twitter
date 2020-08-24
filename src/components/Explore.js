import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllPostsAction } from "../redux/actions/postAction";

function Explore({ userId, tweetCountMap, getAllPostsAction }) {
  useEffect(() => {
    /**call get allpost for each reload */
    getAllPostsAction();
  }, [userId, getAllPostsAction]);
  return (
    <div>
      <h3>Explore Page coming soon..{tweetCountMap.size}.</h3>
      <ul>
        {tweetCountMap &&
          [...tweetCountMap.keys()].map((key) => (
            <li key={key}>
              <span>{key}</span>
              <span>{tweetCountMap.get(key)}</span>
            </li>
          ))}
      </ul>
    </div>
  );
}
const mapStateToProps = ({ user, posts }) => {
  /**get all hashtags */
  console.log("posts::", posts);
  let hashTags = posts.map((post) => post.hashTags).toString();
  console.log("hashtags,", hashTags);
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
  [...tweetCountMap.keys()].map((key) => console.log(key));
  return { userId: user.userId, tweetCountMap };
};
const mapActionToProps = {
  getAllPostsAction,
};
export default connect(mapStateToProps, mapActionToProps)(Explore);
