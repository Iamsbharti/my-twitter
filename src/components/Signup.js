import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import "../css/Home.css";
import { signup } from "../apis/usersApi";

function Signup() {
  let history = useHistory();
  /**define signup-state */
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [username, setUserName] = useState("");
  let [LOADING, setLoading] = useState(false);
  let [error, setError] = useState("Processing...");
  let [errorClassName, setClassName] = useState("");

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
      /**redirect to login post success */
      setError("Redirecting to Login...");
      setTimeout(() => history.push("/login"), 1500);
    }
  };
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
  );
}
export default Signup;
