import React, { useState } from "react";
import { Button } from "@material-ui/core";

function ForgotPassword() {
  let [userFound, setUserFound] = useState(false);
  let [toggleRecoveryDiv, setToggle] = useState(true);
  const findUser = () => {
    console.log("Find user");
    setUserFound(!userFound);
    setToggle(!toggleRecoveryDiv);
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
          <input type="text" />
          <Button onClick={findUser}>Search</Button>
        </div>
      </div>
      <div className="recovery__code" hidden={toggleRecoveryDiv}>
        <h2>Your Email is </h2>
      </div>
    </div>
  );
}
export default ForgotPassword;
