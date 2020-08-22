import React from "react";
import SideBar from "./SideBar";
import Widgets from "./Widgets";
import Feed from "./Feed";
import "../App.css";
import { connect } from "react-redux";

function Bookmarks({ history, userId, post, ...props }) {
  return (
    <div className="app">
      <SideBar />
      <Feed bookmark={true} />
      <Widgets />
    </div>
  );
}
const mapStateToProps = (state) => {
  let { user } = state;
  let { userId } = user.user;
  return { userId: userId };
};

export default connect(mapStateToProps)(Bookmarks);
