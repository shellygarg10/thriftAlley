import React from "react";
import { useState } from "react";
import { useShop } from "../../context/ShopContext";
import { toast } from "react-toastify";
import star_icon from "../../assets/star_icon.png";
import star_dull_icon from "../../assets/star_dull_icon.png";
import "./ProductDisplay.css";

const ProductDisplay = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const { addToCart } = useShop();

  // All possible sizes
  const allSizes = ["S", "M", "L", "XL", "XXL"];

  // Available sizes from product
  const availableSizes = product?.sizes || [];

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.warning("Please select a size before adding to cart!");
      return;
    }
    addToCart({ ...product, selectedSize });
  };

  const isSizeAvailable = (size) => {
    return availableSizes.includes(size);
  };

  const handleSizeClick = (size) => {
    if (isSizeAvailable(size)) {
      setSelectedSize(size);
    }
  };

  if (!product) return null;

  return (
    <div className="productdisplay">
      {/* Left Side: Image */}
      <div className="productdisplay-left">
        <div className="productdisplay-img">
          <img
            className="productdisplay-main-img"
            src={product.image}
            alt={product.name}
          />
        </div>
      </div>

      {/* Right Side: Details */}
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-star">
          {[...Array(4)].map((_, index) => (
            <img key={index} src={star_icon} alt="Star" />
          ))}
          <img src={star_dull_icon} alt="Dull Star" />
          <p>(113)</p>
        </div>

        <div className="productdisplay-right-prices">
          <span className="productdisplay-right-prices-old">
            ₹{product.old_price}
          </span>
          <span className="productdisplay-right-prices-new">
            ₹{product.new_price}
          </span>
        </div>
        {/* Size Selector */}
        <div className="productdisplay-right-size">
          <h2>Select Size:</h2>
          <div className="product-size-options">
            {allSizes.map((size) => (
              <div
                key={size}
                className={`product-size-option 
                  ${selectedSize === size ? "selected" : ""} 
                  ${!isSizeAvailable(size) ? "unavailable" : ""}`}
                onClick={() => handleSizeClick(size)}
              >
                {size}
                {!isSizeAvailable(size) && (
                  <span className="size-status">Out of stock</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button className="productdisplay-add-btn" onClick={handleAddToCart}>
          ADD TO CART
        </button>

        <div className="productdisplay-right-services">
          <p>Easy 30-day returns</p>
          <p>Express delivery available</p>
          <p>Every item is quality checked</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
