import React from "react";
import "../../App.scss";
import MainLanding from "../MainLanding";
import Footer from "../Footer";

function LandingPage(props) {
  return (
    <>
      <MainLanding setToken={props.setToken} />
      <Footer />
    </>
  );
}

export default LandingPage;
