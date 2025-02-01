import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

const addProduct = async (req, res) => {
  try {
    const { name, category, new_price, old_price, sizes, color, brand } =
      req.body;
    const image = req.file;
    if (!image) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(image.path, {
      resource_type: "image",
    });
    const imageUrl = cloudinaryResponse.secure_url;

    const newProduct = new productModel({
      name,
      category,
      image: imageUrl,
      new_price: Number(new_price),
      old_price: Number(old_price),
      sizes: JSON.parse(sizes),
      color: JSON.parse(color),
      brand,
    });
    await newProduct.save();
    res
      .status(201)
      .json({
        success: true,
        message: "Product added successfully",
        product: newProduct,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const removeProduct = async (req, res) => {
  try {
    const product = await productModel.findByIdAndDelete(req.body.id);
    if (!product) {
      res.status(404).json({ success: false, message: "Product not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const singleProduct = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    if (!product) {
      res.status(404).json({ success: false, message: "Product not found" });
    }
    res
      .status(200)
      .json({
        success: true,
        message: "Product fetched successfully",
        product,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addProduct, listProducts, removeProduct, singleProduct };
