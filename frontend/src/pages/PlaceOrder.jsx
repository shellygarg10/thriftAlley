import { useAuth } from "../context/AuthContext";
import { useShop } from "../context/ShopContext";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import razorpayIcon from "../assets/razorpay.png";
import "./CSS/PlaceOrder.css";

import { backendURL } from "../App";

const PlaceOrder = () => {
  const { isLoggedIn, token, user } = useAuth();
  const { cart, clearCart } = useShop();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const [formData, setFormData] = useState({
    fullName: "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
  });

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error("Please login to place an order");
      navigate("/login-signup");
      return;
    }

    if (cart.length === 0) {
      navigate("/");
      return;
    }

    setLoading(false);
  }, [isLoggedIn, cart, navigate]);

  const processOrder = async (razorpayData = null) => {
    try {
      setSubmitting(true);

      const orderData = {
        items: cart.map((item) => ({
          name: item.name,
          image: item.image,
          selectedSize: item.selectedSize || "M",
          quantity: item.quantity,
          new_price: Number(item.new_price),
        })),
        amount: Number(total),
        address: {
          fullName: formData.fullName,
          email: formData.email || "",
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pinCode: formData.pinCode,
        },
        paymentMethod: paymentMethod,
        ...razorpayData,
      };

      const endpoint =
        paymentMethod === "razorpay"
          ? `${backendURL}/api/order/razorpay/complete`
          : `${backendURL}/api/order/place`;

      const response = await axios.post(endpoint, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        await clearCart();
        toast.success("Order placed successfully!");
        navigate("/order-history");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error(error.response?.data?.message || "Failed to place order");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const requiredFields = [
      "fullName",
      "phone",
      "address",
      "city",
      "state",
      "pinCode",
    ];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      toast.error(
        `Please fill in all required fields: ${missingFields.join(", ")}`
      );
      return;
    }

    if (paymentMethod === "razorpay") {
      await handleRazorpayPayment();
    } else {
      await processOrder();
    }
  };

  // Calculate total
  const subtotal = cart.reduce(
    (total, item) => total + Number(item.new_price) * item.quantity,
    0
  );
  const shipping = subtotal > 1000 ? 0 : 100;
  const total = subtotal + shipping;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRazorpayPayment = async () => {
    try {
      const orderResponse = await axios.post(
        `${backendURL}/api/order/razorpay/create`,
        { amount: total },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const { order, key_id } = orderResponse.data;

      const options = {
        key: key_id,
        amount: order.amount,
        currency: order.currency,
        name: "Your Shop Name",
        description: "Purchase Payment",
        order_id: order.id,
        handler: async function (response) {
          try {
            const {
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
            } = response;

            // Complete the order
            await processOrder({
              razorpayOrderId: razorpay_order_id,
              razorpayPaymentId: razorpay_payment_id,
              razorpaySignature: razorpay_signature,
            });
          } catch (error) {
            console.error("Payment verification failed:", error);
            toast.error("Payment verification failed");
          }
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#333333",
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
      toast.error("Failed to initiate payment");
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="place-order">
      <div className="order-details">
        <h2>Order Details</h2>
        <div className="order-items">
          {cart.map((item) => (
            <div
              key={`${item._id}-${item.selectedSize}`}
              className="order-item"
            >
              <img src={item.image} alt={item.name} />
              <div className="order-item-details">
                <h3>{item.name}</h3>
                <p>Size: {item.selectedSize}</p>
                <p>Quantity: {item.quantity}</p>
                <p className="item-price">₹{item.new_price * item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="order-summary">
          <div className="summary-item">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="summary-item">
            <span>Shipping</span>
            <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
          </div>
          <div className="summary-item total">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>
      </div>

      <div className="shipping-details">
        <h2>Shipping Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-row">
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="pinCode"
              placeholder="PIN Code"
              value={formData.pinCode}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="payment-options">
            <h3>Payment Method</h3>
            <div className="payment-methods">
              <label
                className={`payment-method ${
                  paymentMethod === "razorpay" ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="razorpay"
                  checked={paymentMethod === "razorpay"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <div className="payment-method-content">
                  <span className="label-text">Pay Online</span>
                  <img
                    src={razorpayIcon}
                    alt="Razorpay"
                    className="razorpay-icon"
                  />
                </div>
              </label>
              <label
                className={`payment-method ${
                  paymentMethod === "COD" ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="label-text">Cash on Delivery</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="place-order-btn"
            disabled={submitting}
          >
            {submitting
              ? "Processing..."
              : paymentMethod === "razorpay"
              ? "Proceed to Pay"
              : "Place Order"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlaceOrder;
