import React from "react";
import "../css/Utility.css";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
function Messages() {
  let history = useHistory();
  const handleClick = () => {
    history.push("/tweets");
  };
  return (
    <div className="header">
      <h3>Feature Not Yet Ready...</h3>
      <div className="banner">
        <img
          src="https://media.giphy.com/media/14ko1wkUS2thu/giphy.gif"
          alt=""
        />
      </div>
      <div className="bottom">
        <h3>Stay Tuned!!!!</h3>
        <Button onClick={handleClick}>Back To Tweets!!!</Button>
      </div>
    </div>
  );
}
export default Messages;
