import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
function Login() {
  return (
    <div className="login">
      <img src="" alt="" />
      <h2>Log in to Twitter</h2>
      <div className="login__inputs">
        <input type="text" placeholder="email or username" />
        <input type="password" placeholder="Password" />
        <Button className="login__button">Log in</Button>
      </div>
      <div className="login__footer">
        <Link to="/forgotPassword">Forgot password?</Link>
        <Link to="/signup">Sign up for Twitter</Link>
      </div>
    </div>
  );
}
export default Login;
