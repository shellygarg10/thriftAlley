import express from "express";
import { 
    placeOrder, 
    placeOrderRazorpay, 
    getAllOrders, 
    getUserOrders, 
    updateOrderStatus,
    createRazorpayOrder 
} from "../controllers/orderController.js";
import userAuth from "../middleware/userAuth.js";
import adminAuth from "../middleware/auth.js";

const router = express.Router();

// Regular user routes - Orders
router.post("/place", userAuth, placeOrder); // COD orders
router.get("/user-orders/:userId", userAuth, getUserOrders);

// Razorpay routes
router.post("/razorpay/create", userAuth, createRazorpayOrder);
router.post("/razorpay/complete", userAuth, placeOrderRazorpay);

// Admin routes
router.get("/all-orders", adminAuth, getAllOrders);
router.put("/update-status", adminAuth, updateOrderStatus);

export default router;
