import { lazy, Suspense } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
//importing components
import useAuthListener from "./hooks/useAuthListener";
import UserContext from "./context/UserProvider";
import Navbar from "./components/Navbar";
// importing pages
import HomeCountry from "./pages/HomeCountry";
import HomeProvince from "./pages/HomeProvince";
import SinglePostPage from "./pages/SinglePostPage";
import EditPost from "./pages/EditPost";
import Profile from "./pages/Profile";
import Add from "./pages/Add";
import Notifications from "./pages/Notifications";
import Chat from "./pages/Chat";
import Signin from "./pages/SignIn";
import Signup from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const { user, role } = useAuthListener();
  return (
    <Router>
      <Switch>
        {user ? (
          <UserContext.Provider value={{ user, role }}>
            <Navbar />
            {role === "buyer" ? (
              <>
                <Route exact path="/Posts/:postId">
                  <SinglePostPage />
                </Route>
                <Route exact path="/Posts/:postId/Edit">
                  <EditPost />
                </Route>
                <Route exact path="/Profile">
                  <Profile />
                </Route>
                <Route exact path="/Add">
                  <Add />
                </Route>
                <Route exact path="/Notifications">
                  <Notifications />
                </Route>
                <Route exact path="/Chat">
                  <Chat />
                </Route>
                <Redirect to="/Add" />
              </>
            ) : role === "seller" ? (
              <>
                <Route exact path="/">
                  <HomeCountry />
                </Route>
                <Route exact path="/HomeProvince">
                  <HomeProvince />
                </Route>
                <Route exact path="/Profile">
                  <Profile />
                </Route>
                <Route exact path="/Notifications">
                  <Notifications />
                </Route>
                <Route exact path="/Chat">
                  <Chat />
                </Route>
                <Redirect to="/" />
              </>
            ) : null}
          </UserContext.Provider>
        ) : (
          <>
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
            <Redirect to="/SignIn" />
          </>
        )}
      </Switch>
    </Router>
  );
}
export default App;
