import React from "react";
import { Button } from "@material-ui/core";

function ForgotPassword() {
  return (
    <div>
      <div className="forgot__nav">
        <img src={process.env.PUBLIC_URL + "/apple-icon-114x114.png"} alt="" />
        <p>Password Reset</p>
      </div>
      <div className="forgot__password">
        <h2>Find your my-twitter account</h2>
        <code>Enter your email or username.</code>
        <input type="text" />
        <Button>Send Recovery Code</Button>
      </div>
    </div>
  );
}
export default ForgotPassword;
