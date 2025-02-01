import React from "react";
import "./Resell.css";
import resell_img from "../../assets/resell_img.png";

const Resell = () => {
  return (
    <div className="resell">
      <div className="resell-writeup">
        <h1>Declutter your wardrobe</h1>
        <p>
          Send us your gently used clothes that you love but no longer wear -
          Earn BIG rewards! Watch this space for more information.
        </p>
        <button>COMING SOON</button>
      </div>
      <img src={resell_img} alt="Resell your clothes" />
    </div>
  );
};

export default Resell;
