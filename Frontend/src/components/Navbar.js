import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.scss";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <NavLink
            to="/"
            className={click ? "fas fa-times" : "navbar-logo"}
            onClick={closeMobileMenu}
          >
            <img
              alt="navbar-logo"
              className="navbar-image"
              src={require("../assets/logo-without-name.png")}
            />
            <p className="logo-text">HomeChef</p>
          </NavLink>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                to="/recommended"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Recommended
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/liked"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Liked Recipes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/home"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Home
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
