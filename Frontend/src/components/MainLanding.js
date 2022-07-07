import React from "react";
import "../App.scss";
import { Button } from "./Button";
import Modal from "react-modal";
import LoginComponent from "./LoginComponent";
import "./MainLanding.css";

function MainLanding() {
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

  Modal.setAppElement("#root");

  let y = Math.floor(Math.random() * 2);
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="hero-container">
      <video
        src={y === 1 ? "/videos/steak.mp4" : "/videos/vegetables.mp4"}
        autoPlay
        loop
        muted
      />
      <h1>HomeChef</h1>
      <p>Cook from Nothing</p>
      <div className="hero-btns">
        <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
          onClick={openModal}
        >
          GET STARTED
        </Button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Login Modal"
      >
        <LoginComponent />
      </Modal>
    </div>
  );
}

export default MainLanding;
