import React from "react";
import "../css/Post.css";
import { Avatar } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
function Post({
  displayName,
  userName,
  verified,
  timestamp,
  text,
  image,
  avatar,
}) {
  return (
    <div className="post">
      <div className="post__avatar">
        <Avatar src={process.env.PUBLIC_URL}></Avatar>
      </div>
      <div className="post__body">
        <div className="post__header">
          <div className="post__headerText">
            <h3>
              UserName
              <span>
                <VerifiedUserIcon className="post__badge" />
              </span>
            </h3>
          </div>
          <div className="post_headerDescription">
            <p>Challenge you </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Post;
