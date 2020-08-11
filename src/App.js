import React from "react";
import "./App.css";
import SideBar from "./components/SideBar";
function App() {
  return (
    <div>
      <img src={process.env.PUBLIC_URL + "/android-icon-96x96.png"} alt="" />
      {/**Side bar */}
      <SideBar />
      {/**Feeds */}
      {/**Widgets */}
    </div>
  );
}

export default App;
