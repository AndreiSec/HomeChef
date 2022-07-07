import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./LoginComponent.scss";

const LoginComponent = () => {
  const [errorMessages, setErrorMessages] = React.useState({});
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [tabIndex, setTabIndex] = React.useState(0);

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
            <form>
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
                <button type="submit">Login</button>
              </div>
            </form>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="form">
            <p>Login</p>
            <form>
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
            </form>
          </div>
        </TabPanel>
      </Tabs>
    </>
  );
};

export default LoginComponent;

{
}
