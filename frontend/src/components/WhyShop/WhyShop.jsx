import React from "react";
import "./WhyShop.css";
import why_earth_logo from "../../assets/why_earth_logo.png";
import why_un_logo from "../../assets/why_un_logo.png";
import why_guardian_logo from "../../assets/why_guardian_logo.png";

const whyShopData = [
  {
    id: 1,
    logo: why_guardian_logo,
    alt: "guardian",
    text: "Fashion retail sites add new styles at incredibly cheap prices, normalizing overconsumption",
  },
  {
    id: 2,
    logo: why_un_logo,
    alt: "un",
    text: "According to the UN Environment Programme, 20% of global wastewater comes from textile dyeing. Because the bulk of the production is in countries with less regulation, the wastewater often finds its way to rivers and seas.",
  },
  {
    id: 3,
    logo: why_earth_logo,
    alt: "earth.org",
    text: "Clothing sales doubled from 100 to 200 billion units a year, while the average number of times an item was worn decreased by 36% overall.",
  },
];

const WhyShop = () => {
  return (
    <div className="why-shop">
      <h1>WHY SHOP SECOND HAND?</h1>
      <div className="why-shop-container">
        {whyShopData.map((item) => (
          <div key={item.id} className="why-shop-box">
            <img src={item.logo} alt={item.alt} />
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyShop;
