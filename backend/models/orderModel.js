import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  items: [
    {
      name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      selectedSize: {
        type: String,
        default: "M",
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      new_price: {
        type: Number,
        required: true,
      },
    },
  ],
  amount: {
    type: Number,
    required: true,
  },
  address: {
    fullName: {
      type: String,
      required: true,
    },
    email: String,
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pinCode: {
      type: String,
      required: true,
    },
  },
  paymentMethod: {
    type: String,
    enum: ["COD", "razorpay"],
    required: true,
  },
  payment: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Pending",
  },
  razorpayOrderId: String,
  razorpayPaymentId: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Order", orderSchema);
