import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//importing pages
import HomeCountry from "./pages/HomeCountry";
import HomeProvince from "./pages/HomeProvince";
import SinglePostPage from "./pages/SinglePostPage";
import EditPost from "./pages/EditPost";
import Profile from "./pages/Profile";
import Add from "./pages/Add";
import Signup from "./pages/SignUp";
import Signin from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Notifications from "./pages/Notifications";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomeCountry} />
        <Route exact path="/HomeProvince" component={HomeProvince} />
        <Route exact path="/Posts/:postId" component={SinglePostPage} />
        <Route exact path="/Posts/:postId/Edit" component={EditPost} />
        <Route exact path="/Profile" component={Profile} />
        <Route exact path="/Add" component={Add} />
        <Route exact path="/Notifications" component={Notifications} />
        <Route exact path="/SignUp" component={Signup} />
        <Route exact path="/SignIn" component={Signin} />
        <Route
          exact
          path="/forgot-password/reset-link"
          component={ForgotPassword}
        />
        <Route
          exact
          path="/forgot-password/reset-password/:token"
          component={ResetPassword}
        />
      </Switch>
    </Router>
  );
}
export default App;
