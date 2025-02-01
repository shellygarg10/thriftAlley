import React from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";
import hero_bg from "../../assets/hero_bg.png";

const Hero = () => {
  const navigate = useNavigate();
  const handleShopClick = () => {
    navigate("/products");
  };

  return (
    <div>
      <div className="hero">
        <img src={hero_bg} alt="banner" />
        <div className="hero-banner">
          <h1>JOIN THE THRIFT REVOLUTION</h1>
          <p>
            GET POPULAR BRANDS AT UNBEATABLE PRICES. START THRIFTING UNDER RS.
            299
          </p>
          <button className="hero-btn" onClick={handleShopClick}>
            SHOP
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
