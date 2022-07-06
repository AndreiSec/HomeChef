import React from "react";
import "../App.scss";
import { Button } from "./Button";
import "./HeroSection.css";

function HeroSection() {
  let y = Math.floor(Math.random() * 2);

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
        >
          GET STARTED
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
