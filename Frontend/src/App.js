import React from "react";
import Navbar from "./components/Navbar";
import "./App.scss";
import Home from "./components/pages/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import SignUp from "./components/pages/SignUp";
import LikedRecipes from "./components/pages/LikedRecipes";
import Recommended from "./components/pages/Recommended";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Redirect from="/" to="/home" />
          </Route>
          <Route path="/home" exact component={Home} />
          <Route path="/liked" component={LikedRecipes} />
          <Route path="/recommended" component={Recommended} />
          <Route path="/sign-up" component={SignUp} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
