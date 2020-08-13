import React from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import "../css/Home.css";
function Home() {
  let history = useHistory();
  return (
    <div className="home">
      <img src={process.env.PUBLIC_URL + "/apple-icon-114x114.png"} alt="" />
      <h2>See what’s happening in the world right now</h2>

      <div className="home__options">
        <h3>Join Twitter today.</h3>
      </div>
      <div className="home__buttons">
        <Button
          className="button__signup"
          onClick={(e) => history.push("/signup")}
        >
          Sign up
        </Button>
        <Button
          className="button__login"
          onClick={(e) => history.push("/login")}
        >
          Log in
        </Button>
      </div>
    </div>
  );
}
export default Home;
