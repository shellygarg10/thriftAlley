import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./CSS/OrderHistory.css";

const OrderHistory = () => {
  const { isLoggedIn, token, user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (!isLoggedIn || !user) {
      navigate("/login-signup");
      return;
    }
    fetchOrders();
  }, [isLoggedIn, user, navigate]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `${backendURL}/api/order/user-orders/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="order-history">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <div className="no-orders">
          <h3>Your Order History is Empty</h3>
          <p>Looks like you have not placed any orders yet</p>
          <button onClick={() => navigate("/products")}>Shop Now</button>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <div className="order-id">Order #{order._id.slice(-6)}</div>
                <div className="order-date">
                  {new Date(order.date).toLocaleDateString()}
                </div>
                <div className={`order-status ${order.status.toLowerCase()}`}>
                  {order.status}
                </div>
              </div>

              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <img src={item.image} alt={item.name} />
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p>Size: {item.selectedSize}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>₹{item.new_price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <div className="delivery-address">
                  <h4>Delivery Address</h4>
                  <p>{order.address.fullName}</p>
                  <p>{order.address.address}</p>
                  <p>
                    {order.address.city}, {order.address.state} -{" "}
                    {order.address.pinCode}
                  </p>
                  <p>Phone: {order.address.phone}</p>
                </div>
                <div className="order-summary">
                  <div className="payment-method">
                    Payment Method: {order.paymentMethod}
                  </div>
                  <div className="order-total">
                    Total Amount: ₹{order.amount}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
