import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import "../css/Post.css";
function Home() {
  return (
    <div className="home">
      <img src={process.env.PUBLIC_URL + "/apple-icon-114x114.png"} alt="" />
      <h2>See what’s happening in the world right now</h2>

      <div className="home__options">
        <h3>Join Twitter today.</h3>
        <Link to="/signup">
          <Button className="button__signup">Sign up</Button>
        </Link>
        <Link to="/login">
          <Button className="button_login">Login</Button>
        </Link>
      </div>
    </div>
  );
}
export default Home;
