import React from "react";
import { Button } from "@material-ui/core";

function ForgotPassword() {
  return (
    <div className="forgot__password">
      <h2>Find your Twitter account</h2>
      <code>Enter your email, phone number, or username.</code>
      <input type="text" />
      <Button>Search</Button>
    </div>
  );
}
export default ForgotPassword;
