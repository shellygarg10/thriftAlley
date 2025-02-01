import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const { _id, image, name, brand, new_price, old_price } = product;

  return (
    <Link to={`/products/${_id}`} className="product-card">
      <div className="product-image">
        <img src={image} alt={name} />
      </div>
      <div className="product-details">
        <h3>{name}</h3>
        <p className="product-brand">{brand}</p>
        <div className="product-prices">
          <span className="new-price">₹{new_price}</span>
          {old_price && <span className="old-price">₹{old_price}</span>}
        </div>
      </div>
    </Link>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    new_price: PropTypes.number.isRequired,
    old_price: PropTypes.number,
  }).isRequired,
};

export default ProductCard;
