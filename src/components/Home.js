import React from "react";
import { Button } from "@material-ui/core";
function Home() {
  return (
    <div className="home">
      <img src={process.env.PUBLIC_URL + "/apple-icon-114x114.png"} alt="" />
      <h2>See what’s happening in the world right now</h2>

      <div className="home__options">
        <h3>Join Twitter today.</h3>
        <Button className="button__signup">Sign up</Button>
        <Button className="button_login">Login</Button>
      </div>
    </div>
  );
}
export default Home;
