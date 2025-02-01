import React from "react";
import { useShop } from "../../context/ShopContext";
import "./CartItem.css";

const CartItem = ({ item }) => {
  const { updateCartItemQuantity, removeFromCart } = useShop();

  const handleQuantityChange = (change) => {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      updateCartItemQuantity(item._id, item.selectedSize, newQuantity);
    } else {
      removeFromCart(item._id, item.selectedSize);
    }
  };

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item-image" />

      <div className="cart-item-details">
        <h3>{item.name}</h3>
        <p className="cart-item-size">Size: {item.selectedSize}</p>
        <p className="cart-item-price">₹{item.new_price}</p>
      </div>

      <div className="cart-item-quantity">
        <button onClick={() => handleQuantityChange(-1)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => handleQuantityChange(1)}>+</button>
      </div>

      <div className="cart-item-total">₹{item.new_price * item.quantity}</div>

      <button
        className="cart-item-remove"
        onClick={() => removeFromCart(item._id, item.selectedSize)}
      >
        ×
      </button>
    </div>
  );
};

export default CartItem;
