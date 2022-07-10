import React, { useState } from "react";
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
  function setToken(userToken) {
    sessionStorage.setItem("token", JSON.stringify(userToken));
  }

  function deleteToken() {
    sessionStorage.removeItem("token");
    window.location.reload(true);
  }

  function getToken() {
    return sessionStorage.getItem("token");
  }

  const token = getToken();

  return (
    <>
      <Router>
        <Navbar token={token} setToken={setToken} deleteToken={deleteToken} />
        <Switch>
          <Route exact path="/">
            <Redirect from="/" to={token ? "/home" : "/landing"} />
          </Route>
          <Route path="/landing" exact>
            <LandingPage setToken={setToken} />
          </Route>
          <Route path="/liked" component={LikedRecipes} />
          <Route path="/recommended" component={Recommended} />
          <Route path="/home" component={Home} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
