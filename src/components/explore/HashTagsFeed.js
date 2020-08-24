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
                <h3>HashTags</h3>
              </div>
            </div>
            {hashtags &&
              [...hashtags.keys()].map((key) => (
                <div className="post" key={key}>
                  <div className="post__body">
                    <div className="post__header">
                      <div className="post__headerText">
                        <span>{key}</span>
                        <span>{hashtags.get(key)}</span>
                      </div>
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
