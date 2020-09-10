import React from "react";
import SideBar from "./SideBar";
import Widgets from "./Widgets";
import Feed from "./Feed";
import "../App.css";
import { connect } from "react-redux";
function Bookmarks({ userId, bookmarks }) {
  return (
    <div className="app">
      <SideBar />
      <Feed bookmark={true} bookmarks={bookmarks} />
      <Widgets />
    </div>
  );
}
const mapStateToProps = (state) => {
  let { user, posts } = state;
  let { userId } = user.user;
  let bookmarks = posts && posts.filter((p) => p.bookMarkedBy.includes(userId));
  return { userId: userId, bookmarks: bookmarks };
};
export default connect(mapStateToProps)(Bookmarks);
