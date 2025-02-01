import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    const options = {
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `order_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order,
      key_id: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create payment order",
    });
  }
};

const placeOrderRazorpay = async (req, res) => {
  try {
    const { items, amount, address, razorpayOrderId, razorpayPaymentId } =
      req.body;

    const userId = req.user._id;

    const orderData = {
      userId,
      items: items.map((item) => ({
        name: item.name,
        image: item.image,
        selectedSize: item.selectedSize,
        quantity: item.quantity,
        new_price: item.new_price,
      })),
      amount,
      address,
      paymentMethod: "razorpay",
      payment: true,
      status: "Processing",
      razorpayOrderId,
      razorpayPaymentId,
    };

    const newOrder = new orderModel(orderData);
    const savedOrder = await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: [] });

    res.status(200).json({
      success: true,
      message: "Order placed successfully",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Error in placeOrderRazorpay:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to place order",
    });
  }
};

const placeOrder = async (req, res) => {
  try {
    console.log("User from auth:", req.user);

    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const { items, amount, address, paymentMethod } = req.body;
    const userId = req.user._id;

    if (!items || !amount || !address || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const orderData = {
      userId,
      items: items.map((item) => ({
        name: item.name,
        image: item.image,
        selectedSize: item.selectedSize,
        quantity: item.quantity,
        new_price: item.new_price,
      })),
      amount,
      address: {
        fullName: address.fullName,
        email: address.email || "",
        phone: address.phone,
        address: address.address,
        city: address.city,
        state: address.state,
        pinCode: address.pinCode,
      },
      paymentMethod,
      payment: paymentMethod === "COD" ? false : true,
      status: "Pending",
    };
    const newOrder = new orderModel(orderData);
    const savedOrder = await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: [] });

    res.status(200).json({
      success: true,
      message: "Order placed successfully",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Error in placeOrder:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to place order",
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find().sort({ date: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (userId !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view these orders",
      });
    }

    const orders = await orderModel.find({ userId }).sort({ date: -1 });

    if (!orders) {
      return res.status(404).json({
        success: false,
        message: "No orders found",
      });
    }

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    const validStatuses = [
      "Pending",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const updatedOrder = await orderModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export {
  placeOrder,
  placeOrderRazorpay,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
  createRazorpayOrder,
};
