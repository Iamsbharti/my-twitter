import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import "../css/Home.css";
import { recoverPassword, resetPassword } from "../apis/usersApi";
import { useHistory } from "react-router-dom";

function ForgotPassword() {
  let [userFound, setUserFound] = useState(false);
  let [toggleRecoveryDiv, setToggle] = useState(true);
  let [loginId, setLoginId] = useState("");
  let [errorRes, setError] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPwd] = useState("");
  let [confirmPwd, setConfirmPwd] = useState("");
  let [code, setCode] = useState("");
  let [pwdValidationError, setPwdValidError] = useState("");
  let [pwdMatchError, setPwdMatchError] = useState("");
  let [doesPwdMatch, setDoesPwdMatch] = useState();
  let [apiErrorRes, setApiRes] = useState();
  let history = useHistory();

  /**send password recovery code */
  const sendRecoveryCode = async () => {
    console.log("Find user");
    setError("Processing...");
    let recoveryResponse = await recoverPassword(loginId);
    let { error, message, data } = recoveryResponse;
    console.log("error", error, message);
    /**show password reset div upon success */
    if (!error) {
      setError(message);
      setUserFound(!userFound);
      setToggle(!toggleRecoveryDiv);
      setEmail(data);
    } else {
      /**only show error txt */
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
  /**reset password api call */
  const handleResetPassword = async () => {
    setPwdMatchError("");
    console.log("reset password");
    let resetInfo = {
      email: email,
      recoveryCode: code,
      password: password,
      operation: "reset",
    };
    let resetResponse = await resetPassword(resetInfo);
    let { error, message } = resetResponse;
    /**redirect to login on success */
    if (!error) {
      setError(`${message} Redirecting to Login Page...`);
      setApiRes(error);
      setTimeout(() => history.push("/login"), 1400);
    } else {
      setApiRes(error);
      setError(message);
    }
  };
  return (
    <div>
      <div className="forgot__nav">
        <img src={process.env.PUBLIC_URL + "/apple-icon-114x114.png"} alt="" />
        <p>Password Reset</p>
      </div>
      <div hidden={userFound}>
        <div className="forgot__password">
          <h2>Find your my-twitter account</h2>
          <code>Enter your email or username.</code>
          <input
            type="text"
            name="loginId"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
          />
          <Button onClick={sendRecoveryCode}>Search</Button>
          <span
            style={{ color: apiErrorRes ? "red" : "green", marginTop: "10px" }}
          >
            {errorRes}
          </span>
        </div>
      </div>
      <div hidden={toggleRecoveryDiv}>
        <div className="recovery__code">
          <h2>
            Your Email is{" "}
            <code style={{ color: "green", fontSize: "25px" }}>{email}</code>
          </h2>
          <h2>Check You Mailbox for code </h2>
          <code>Enter Your Recovery Code</code>
          <input
            type="text"
            name="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <code>Enter New Password</code>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPwd(e.target.value)}
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
            onChange={(e) => setConfirmPwd(e.target.value)}
          />
          <span style={{ color: doesPwdMatch ? "green" : "red" }}>
            {pwdMatchError}
          </span>
          <Button onClick={handleResetPassword}>Reset Password</Button>
          <span
            style={{ color: apiErrorRes ? "red" : "green", marginTop: "10px" }}
          >
            {errorRes}
          </span>
        </div>
      </div>
    </div>
  );
}
export default ForgotPassword;
