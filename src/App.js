import React from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import TweetsPage from "./components/TweetsPage";
import ForgotPassword from "./components/ForgotPassword";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import TweetStatus from "./components/TweetStatus";
import Bookmarks from "./components/Bookmarks";
import Explore from "./components/explore/Explore";
import Profile from "./components/profile/ProfileContainer";
import PageNotFound from "./components/PageNotFound";
import More from "./components/More";
import Notifications from "./components/Notifications";
import Messages from "./components/Messages";
import Lists from "./components/Lists";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/tweets" component={TweetsPage} />
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/forgotPwd" component={ForgotPassword} />
          <Route
            exact
            path="/:userName/status/:postId"
            component={TweetStatus}
          />
          <Route exact path="/bookmarks" component={Bookmarks} />
          <Route exact path="/profile/:userId" component={Profile} />
          <Route exact path="/explore" component={Explore} />
          <Route exact path="/more" component={More} />
          <Route exact path="/notifications" component={Notifications} />
          <Route exact path="/messages" component={Messages} />
          <Route exact path="/lists" component={Lists} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
