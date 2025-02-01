import React from "react";
import { useNavigate } from "react-router-dom";
import { useShop } from "../../context/ShopContext";
import "./CartTotal.css";

const CartTotal = () => {
  const navigate = useNavigate();
  const { cart } = useShop();

  const subtotal = cart.reduce(
    (total, item) => total + item.new_price * item.quantity,
    0
  );

  const shipping = subtotal > 1000 ? 0 : 100;
  const total = subtotal + shipping;

  return (
    <div className="cart-total">
      <h2>Order Summary</h2>

      <div className="cart-total-details">
        <div className="cart-total-item">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>

        <div className="cart-total-item">
          <span>Shipping</span>
          <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
        </div>

        {shipping > 0 && (
          <p className="free-shipping-note">
            Add ₹{1000 - subtotal} more for free shipping
          </p>
        )}

        <div className="cart-total-item total">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>

      <button
        className="checkout-button"
        onClick={() => navigate("/place-order")}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartTotal;
