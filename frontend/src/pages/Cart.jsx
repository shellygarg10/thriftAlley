import { useShop } from "../context/ShopContext";
import CartItem from "../components/CartItem/CartItem";
import CartTotal from "../components/CartTotal/CartTotal";
import { Link } from "react-router-dom";
import "./CSS/Cart.css";

const Cart = () => {
  const { cart } = useShop();

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your Shopping Cart is Empty</h2>
        <p>Looks like you have not added anything to your cart yet</p>
        <Link to="/products" className="shop-now-btn">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="cart">
      <h1>Your Cart</h1>
      <div className="cart-content">
        <div className="cart-items">
          {cart.map((item) => (
            <CartItem key={`${item._id}-${item.selectedSize}`} item={item} />
          ))}
        </div>
        <CartTotal />
      </div>
    </div>
  );
};

export default Cart;
