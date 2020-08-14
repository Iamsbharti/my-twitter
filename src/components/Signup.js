import React from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
function Signup() {
  let history = useHistory();
  return (
    <div className="signup">
      <div className="signup__content">
        <div className="signup__nav">
          <img
            src={process.env.PUBLIC_URL + "/apple-icon-114x114.png"}
            alt=""
          />
        </div>
        <p>Create your account</p>
        <input type="text" placeholder="name" />
        <input type="text" placeholder="Phone or Email" />
        <input type="text" placeholder="create a username" />
        <Button>Sign up</Button>
        <br />
        <h4 onClick={() => history.push("/")}>Cancel?</h4>
      </div>
    </div>
  );
}
export default Signup;
