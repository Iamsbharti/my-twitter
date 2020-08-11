import React from "react";
import "./App.css";
import SideBar from "./components/SideBar";
import Feed from "./components/Feed";
function App() {
  return (
    <div className="app">
      {/**Side bar */}
      <SideBar />
      {/**Feeds */}
      <Feed />
      {/**Widgets */}
    </div>
  );
}

export default App;
