import React from "react";
import "../../css/Feed.css";
import "../../css/Post.css";
import { useHistory } from "react-router-dom";

function HashTagsFeed({ hashtags, hashTagsArray }) {
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
            {hashTagsArray &&
              hashTagsArray.map((val, index) => (
                <div className="tag__post" key={index}>
                  <div className="post__body">
                    <div className="post__headerText">
                      <span>{val.tag}</span>
                    </div>
                    <div className="post__header__counter">
                      <span>
                        {val.count} {val.count === 1 ? "Tweet" : "Tweets"}
                      </span>
                    </div>
                    <div className="post__header__usernames">
                      {val.name && val.name}
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
