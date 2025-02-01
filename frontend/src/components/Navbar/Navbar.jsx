import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useShop } from "../../context/ShopContext";

import "./Navbar.css";

import logo from "../../assets/logo.png";
import cart_icon from "../../assets/cart_icon.png";
import nav_dropdown from "../../assets/nav_dropdown.png";
import user_icon from "../../assets/user_icon.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const { cart } = useShop();
  const navigate = useNavigate();

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleCategoryClick = (category) => {
    navigate(`/products${category ? `?category=${category}` : ""}`);
  };

  return (
    <div className="navbar">
      <img
        src={nav_dropdown}
        alt="menu"
        className="nav-dropdown-icon"
        onClick={toggleMenu}
      />

      <div className="nav-logo">
        <Link to="/">
          <img src={logo} alt="thrift-alley" />
        </Link>
      </div>

      <ul className={`nav-menu ${isMenuOpen ? "open" : ""}`}>
        <li
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </li>
        <li onClick={() => handleCategoryClick("Tops")}>Tops</li>
        <li onClick={() => handleCategoryClick("Bottoms")}>Bottoms</li>
        <li onClick={() => handleCategoryClick("Dresses")}>Dresses</li>
      </ul>

      <div className="nav-login-cart">
        <div className="user-menu-container">
          <img
            src={user_icon}
            alt="user"
            className="user-icon"
            onClick={
              isLoggedIn ? toggleUserMenu : () => navigate("/login-signup")
            }
          />
          {isLoggedIn && isUserMenuOpen && (
            <div className="user-dropdown">
              <div
                onClick={() => {
                  navigate("/order-history");
                  setIsUserMenuOpen(false);
                }}
              >
                Order History
              </div>
              <div
                onClick={() => {
                  logout();
                  setIsUserMenuOpen(false);
                }}
              >
                Logout
              </div>
            </div>
          )}
        </div>
        <Link to="/cart" className="cart-link">
          <img src={cart_icon} alt="cart" />
          <div className="nav-cart-count">{cartCount}</div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
