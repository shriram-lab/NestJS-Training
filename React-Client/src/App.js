import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeComponent from "./Components/HomeComponent";
import LoginComponent from "./Components/LoginComponent";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/Home" component={HomeComponent}></Route>
          <Route exact path="/Users" component={HomeComponent}></Route>
          <Route exact path="/" component={HomeComponent}></Route>
          <Route component={LoginComponent}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
