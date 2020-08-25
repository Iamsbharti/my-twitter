import React from "react";
import "../../css/Feed.css";
import "../../css/Post.css";
import { useHistory } from "react-router-dom";

function HashTagsFeed({ hashtags }) {
  /**define state */
  let history = useHistory();
  return (
    <>
      <div className="feed">
        {localStorage.getItem("authToken") ? (
          <>
            <div className="feedHeader">
              <div className="status__header">
                <div>
                  <h3>HashTags</h3>
                </div>
                <div className="status__header__img">
                  <img src={process.env.PUBLIC_URL + "/hashtags.png"} alt="" />
                </div>
              </div>
            </div>
            {hashtags &&
              [...hashtags.keys()].map((key) => (
                <div className="tag__post" key={key}>
                  <div className="post__body">
                    <div className="post__headerText">
                      <span>{key}</span>
                    </div>
                    <div className="post__header__counter">
                      <span>
                        {hashtags.get(key)}{" "}
                        {hashtags.get(key) === 1 ? "Tweet" : "Tweets"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </>
        ) : (
          history.push("/login")
        )}
      </div>
    </>
  );
}
export default HashTagsFeed;
