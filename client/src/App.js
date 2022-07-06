import Login from "./pages/Login";
import Register from "./pages/Register";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        {/* <Route exact path="/" component={Home}><Home/></Route> */}
        {/* <Route path="/login" component={Login}><Login /></Route>
        <Route path="/signup" component={Register}></Route> */}
      </Switch>
    </Router>
  );
}

export default App;
