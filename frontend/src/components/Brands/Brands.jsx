import React from "react";
import { useNavigate } from "react-router-dom";
import "./Brands.css";
import nike_logo from "../../assets/nike_logo.png";
import mango_logo from "../../assets/mango_logo.png";
import fila_logo from "../../assets/fila_logo.png";
import marks_logo from "../../assets/marks_logo.png";

const Brands = () => {
  const navigate = useNavigate();

  const handleShopClick = () => {
    navigate("/products");
  };

  return (
    <div className="brands">
      <h1>Brands you love, now at incredible discounts</h1>
      <h2>Handpicked, quality-checked & authenticated.</h2>
      <div className="brands-logo">
        <img src={nike_logo} alt="nike" />
        <img src={mango_logo} alt="mango" />
        <img src={fila_logo} alt="fila" />
        <img src={marks_logo} alt="marks&spencers" />
      </div>
      <button onClick={handleShopClick}>EXPLORE ALL</button>
    </div>
  );
};

export default Brands;
