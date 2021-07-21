import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
//importing pages
import HomeCountry from './pages/HomeCountry'
import Profile from './pages/Profile'
import Add from './pages/Add'
import Signup from './pages/SignUp'
import Signin from './pages/SignIn'

function App() {
  return (
  <Router>
    <Switch>
      <Route exact path="/" component={HomeCountry}/>
      <Route exact path="/Profile" component={Profile}/>
      <Route  exact path="/Add" component={Add}/>
      <Route exact path='/SignUp' component={Signup}/>
      <Route exact path='/SignIn' component={Signin}/>
    </Switch>
  </Router>
  );
}
export default App;
