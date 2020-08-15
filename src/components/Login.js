import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import "../css/Home.css";
import { loginAction } from "../redux/actions/userActions";
import { connect } from "react-redux";

function Login({ loginAction, message, error, isAuthenticated }) {
  let history = useHistory();
  /**define state */
  let [loginId, setLoginId] = useState("");
  let [password, setPwd] = useState("");
  let [authenticating, setAuth] = useState(false);
  let [status, setStatus] = useState("");
  let [errorClassName, setClassName] = useState("");
  /**manipulate local state */
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "loginId":
        setLoginId(value);
        break;
      case "password":
        setPwd(value);
        break;
      default:
    }
  };
  /**handle login */
  const handleLogin = async () => {
    console.log("handle login");
    let userInfo = {
      loginId: loginId,
      password: password,
    };
    /**set loading to true */
    setAuth(true);
    setStatus("Processing...");
    setClassName("");
    setTimeout(() => loginAction(userInfo), 1200);
  };
  /**change state post login response */
  useEffect(() => {
    setAuth(true);
    setStatus(
      isAuthenticated ? `${message} - Redirecting to Tweets...` : message
    );
    /**set classname based on error */
    error ? setClassName("signup__error") : setClassName("signup__success");
  }, [isAuthenticated, message, error]);
  return (
    <div className="login">
      <img src={process.env.PUBLIC_URL + "/apple-icon-114x114.png"} alt="" />
      <h2>Log in to my-twitter</h2>
      <div className="login__inputs">
        <input
          type="text"
          placeholder="email or username"
          name="loginId"
          value={loginId}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleChange}
        />
        <span className={errorClassName}>{authenticating && status}</span>
        <Button className="login__button" onClick={handleLogin}>
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
const mapStateToProps = ({ user }) => {
  let { error, message, isAuthenticated } = user.user;
  return {
    loginStatus: user.authStatus,
    message,
    error,
    isAuthenticated,
  };
};

const mapActionToProps = { loginAction };
export default connect(mapStateToProps, mapActionToProps)(Login);
