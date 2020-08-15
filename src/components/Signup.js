import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import "../css/Home.css";
import { signup, resetPassword } from "../apis/usersApi";

function Signup() {
  let history = useHistory();
  /**define signup-state */
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [username, setUserName] = useState("");
  let [currentPassword, setCPwd] = useState("");
  let [password, setPwd] = useState("");
  let [confirmPwd, setConfirmPwd] = useState("");
  let [LOADING, setLoading] = useState(false);
  let [error, setError] = useState("Processing...");
  let [errorClassName, setClassName] = useState("");
  let [toggleSignupDiv, setToggleSignup] = useState(false);
  let [toggleResetDiv, setToggleReset] = useState(true);
  let [pwdValidationError, setPwdValidError] = useState("");
  let [pwdMatchError, setPwdMatchError] = useState("");
  let [doesPwdMatch, setDoesPwdMatch] = useState();

  /**manipulate state */
  const handleChange = (e) => {
    let { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "username":
        setUserName(value);
        break;
      case "current":
        setCPwd(value);
        break;
      case "password":
        setPwd(value);
        break;
      case "confirmPwd":
        setConfirmPwd(value);
        break;
      default:
    }
  };
  /**Sign up method */
  const signUpUser = async (e) => {
    e.preventDefault();
    let userInfo = {
      name,
      email,
      username,
    };
    setLoading(true);
    setError("Processing...");
    let signUpResult = await signup(userInfo);
    console.log("sign up res::", signUpResult);
    let { error, message } = signUpResult;
    /**set up error message */
    setError(message);
    /**set classname based on error */
    error ? setClassName("signup__error") : setClassName("signup__success");
    /**clear the form */
    if (error) {
      setError("Try Again...");
      setTimeout(() => {
        setName("");
        setEmail("");
        setUserName("");
        setError("");
        setClassName("");
      }, 3000);
    } else {
      /**prompt for password reset */
      setToggleReset(!toggleResetDiv);
      setToggleSignup(!toggleSignupDiv);
    }
  };
  const setPassword = async () => {
    console.log("reset password");
    let resetInfo = {
      email: email,
      operation: "set",
      currentPassword: currentPassword,
      password: password,
    };
    setLoading(true);
    setError("Processing...");
    let resetResponse = await resetPassword(resetInfo);
    let { error, message } = resetResponse;
    /**set up error message */
    setError(message);
    /**set classname based on error */
    error ? setClassName("signup__error") : setClassName("signup__success");

    /**redirect on success reset to login */
    if (!error) {
      setError("Redirecting to Login Page...");
      setTimeout(() => history.push("/login"), 1400);
    } else {
      setError(message);
    }
  };
  /**password validation */
  useEffect(() => {
    if (password.length > 0) {
      let pattern = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
      );
      const PWD_ERROR = `Password should contain atleast
                     1 Lowercase, 1 Uppercase , 1 Symbol
                     and mininum of 8 characters;`;
      let validated = pattern.test(password);
      validated ? setPwdValidError("") : setPwdValidError(PWD_ERROR);

      /**password and confirm password matcher */
      let matched = password === confirmPwd;
      matched ? setDoesPwdMatch(true) : setDoesPwdMatch(false);
      matched
        ? setPwdMatchError("Passwords Matched")
        : setPwdMatchError("Passwords Doesn't Match");
    }
  }, [password, confirmPwd]);
  return (
    <div>
      <div hidden={toggleSignupDiv}>
        <div className="signup">
          <div className="signup__content">
            <div className="signup__nav">
              <img
                src={process.env.PUBLIC_URL + "/apple-icon-114x114.png"}
                alt=""
              />
            </div>
            <p>Create your account</p>
            <form onSubmit={signUpUser}>
              <input
                name="name"
                type="text"
                placeholder="name"
                value={name}
                onChange={handleChange}
              />
              <input
                name="email"
                type="text"
                placeholder="Phone or Email"
                value={email}
                onChange={handleChange}
              />
              <input
                name="username"
                type="text"
                placeholder="create a username"
                value={username}
                onChange={handleChange}
              />
              <Button type="submit">Sign up</Button>
            </form>
            <br />
            <span className={errorClassName}>{LOADING && error}</span>
            <h4 onClick={() => history.push("/")}>Cancel?</h4>
          </div>
        </div>
      </div>
      <div hidden={toggleResetDiv}>
        <div className="reset__password">
          <img
            src={process.env.PUBLIC_URL + "/apple-icon-114x114.png"}
            alt=""
          />
          <p>Reset Your Password</p>
          <h4>you current password has been sent to {email}</h4>
          <code>Enter Current Password</code>
          <input
            type="password"
            name="current"
            value={currentPassword}
            onChange={handleChange}
          />
          <code>Enter New Password</code>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
          <span
            style={{ color: "red", marginTop: "10px", marginBottom: "10px" }}
          >
            {pwdValidationError}
          </span>
          <code>Type Again</code>
          <input
            type="password"
            name="confirmPwd"
            value={confirmPwd}
            onChange={handleChange}
          />
          <span style={{ color: doesPwdMatch ? "green" : "red" }}>
            {pwdMatchError}
          </span>
          <Button onClick={setPassword}>Reset Password</Button>
          <span className={errorClassName} style={{ marginTop: "10px" }}>
            {LOADING && error}
          </span>
        </div>
      </div>
    </div>
  );
}
export default Signup;
