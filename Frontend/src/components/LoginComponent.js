import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useHistory } from "react-router-dom";
import "react-tabs/style/react-tabs.css";
import "./LoginComponent.scss";

const LoginComponent = (props) => {
  const [errorMessages, setErrorMessages] = React.useState({});

  const setToken = props.setToken;

  const token = "logged_in";

  const history = useHistory();

  const login = () => {
    setToken(token);
    let path = `/home`;
    history.push(path);
    window.location.reload(true);
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  return (
    <>
      <img
        alt="navbar-logo"
        className="logo-login"
        src={require("../assets/logo-with-name-green.png")}
      />
      <Tabs>
        <TabList>
          <Tab>Login</Tab>
          <Tab>Sign Up</Tab>
        </TabList>

        <TabPanel>
          <div className="form">
            <p>Login</p>
            <div className="input-container">
              <label>Username </label>
              <input type="text" name="uname" required />
              {renderErrorMessage("uname")}
            </div>
            <div className="input-container">
              <label>Password </label>
              <input type="password" name="pass" required />
              {renderErrorMessage("pass")}
            </div>
            <div className="button-container">
              <button onClick={login} type="submit">
                Login
              </button>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="form">
            <p>Login</p>
            <div className="input-container">
              <label>Username </label>
              <input type="text" name="uname" required />
              {renderErrorMessage("uname")}
            </div>
            <div className="input-container">
              <label>Password </label>
              <input type="password" name="pass" required />
              {renderErrorMessage("pass")}
            </div>
            <div className="button-container">
              <button type="submit">Sign-Up</button>
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </>
  );
};

export default LoginComponent;

{
}
