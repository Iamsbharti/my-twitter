import React from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import "../css/Home.css";
function Login() {
  let history = useHistory();
  return (
    <div className="login">
      <img src={process.env.PUBLIC_URL + "/apple-icon-114x114.png"} alt="" />
      <h2>Log in to my-twitter</h2>
      <div className="login__inputs">
        <input type="text" placeholder="email or username" />
        <input type="password" placeholder="Password" />
        <Button
          className="login__button"
          onClick={() => history.push("/login")}
        >
          Log in
        </Button>
      </div>
      <div className="login__footer">
        <p onClick={() => history.push("/forgotPwd")}>Forgot password?</p>.
        <p onClick={() => history.push("/signup")}>Sign up for my-twitter</p>
      </div>
    </div>
  );
}
export default Login;
