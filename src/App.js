import React from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import TweetsPage from "./components/TweetsPage";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
function App({ auth }) {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/tweets" component={TweetsPage} />
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/forgotPwd" component={ForgotPassword} />
          <Route exact path="/resetPwd" component={ResetPassword} auth={auth} />
        </Switch>
      </Router>
    </div>
  );
}
const mapStateToProps = ({ user }) => {
  let { isAuthenticated, email } = user.user;
  let auth = {
    email,
    isAuthenticated,
  };
  return { auth };
};
export default connect(mapStateToProps)(App);
