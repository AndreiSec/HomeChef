import React from "react";
import Navbar from "./components/Navbar";
import "./App.scss";
import LandingPage from "./components/pages/LandingPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./components/pages/Home";
import LikedRecipes from "./components/pages/LikedRecipes";
import Recommended from "./components/pages/Recommended";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Redirect from="/" to="/landing" />
          </Route>
          <Route path="/landing" exact component={LandingPage} />
          <Route path="/liked" component={LikedRecipes} />
          <Route path="/recommended" component={Recommended} />
          <Route path="/home" component={Home} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
