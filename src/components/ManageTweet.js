import React, { useState } from "react";
import "../css/Post.css";
import { connect } from "react-redux";

function ManageTweet({ history, userId, ...props }) {}
const mapStateToProps = ({ user }) => {
  console.log("state-user in post::", user.user);
  return { userId: user.user.userId };
};

export default connect(mapStateToProps)(ManageTweet);
