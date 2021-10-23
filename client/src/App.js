import { lazy, Suspense } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
//importing pages
import ReactLoader from "./components/ReactLoader";
import useAuthListener from "./hooks/useAuthListener";
import { UserProvider } from "./context/UserProvider";
// lazy loading
const HomeCountry = lazy(() => import("./pages/HomeCountry"));
const HomeProvince = lazy(() => import("./pages/HomeProvince"));
const SinglePostPage = lazy(() => import("./pages/SinglePostPage"));
const EditPost = lazy(() => import("./pages/EditPost"));
const Profile = lazy(() => import("./pages/Profile"));
const Add = lazy(() => import("./pages/Add"));
const Notifications = lazy(() => import("./pages/Notifications"));
const Chat = lazy(() => import("./pages/Chat"));
const Signin = lazy(() => import("./pages/SignIn"));
const Signup = lazy(() => import("./pages/SignUp"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));

function App() {
  const { currentUser, role } = useAuthListener();
  return (
    <Router>
      <Suspense fallback={<ReactLoader />}>
        <Switch>
          {currentUser ? (
            <>
              {role === "buyer" ? (
                <UserProvider>
                  <Route
                    exact
                    path="/Posts/:postId"
                    component={SinglePostPage}
                  />
                  <Route
                    exact
                    path="/Posts/:postId/Edit"
                    component={EditPost}
                  />
                  <Route exact path="/Profile" component={Profile} />
                  <Route exact path="/Add" component={Add} />
                  <Route
                    exact
                    path="/Notifications"
                    component={Notifications}
                  />
                  <Route exact path="/Chat" component={Chat} />
                </UserProvider>
              ) : role === "seller" ? (
                <UserProvider>
                  <Route exact path="/" component={HomeCountry} />
                  <Route exact path="/HomeProvince" component={HomeProvince} />
                  <Route exact path="/Profile" component={Profile} />
                  <Route
                    exact
                    path="/Notifications"
                    component={Notifications}
                  />
                  <Route exact path="/Chat" component={Chat} />
                </UserProvider>
              ) : null}
            </>
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
      </Suspense>
    </Router>
  );
}
export default App;
