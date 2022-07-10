import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import LoginComponent from "./LoginComponent";
import Modal from "react-modal";
import { useHistory } from "react-router-dom";
import "./Navbar.scss";
import { Button } from "./Button";

function Navbar(props) {
  const [click, setClick] = useState(false);
  // const [button, setButton] = useState(true);

  const history = useHistory();

  const deleteToken = props.deleteToken;

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      background: "#F3F3F3",
    },
  };

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }

  const logout = () => {
    let path = `/landing`;
    history.push(path);
    deleteToken();
  };

  const token = props?.token;

  // const showButton = () => {
  //   if (window.innerWidth <= 960) {
  //     setButton(false);
  //   } else {
  //     setButton(true);
  //   }
  // };

  // useEffect(() => {
  //   showButton();
  // }, []);

  // window.addEventListener("resize", showButton);

  if (!token) {
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
              <li className="nav-item centered">
                <Button
                  className="login-button"
                  buttonStyle="btn--gray"
                  buttonSize="btn--large"
                  onClick={openModal}
                >
                  Login
                </Button>
              </li>
            </ul>
          </div>
        </nav>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Login Modal"
        >
          <LoginComponent setToken={props.setToken} />
        </Modal>
      </>
    );
  }

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
            <li className="nav-item centered">
              <Button
                className="login-button"
                buttonStyle="btn--gray"
                buttonSize="btn--medium"
                onClick={logout}
              >
                Logout
              </Button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
