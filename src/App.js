import React from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import TweetsPage from "./components/TweetsPage";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/tweets" component={<TweetsPage />} />
          <Route exact path="/home" component={<Home />} />
          <Route exact path="/login" component={<Login />} />
          <Route exact path="/signup" component={<Signup />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
