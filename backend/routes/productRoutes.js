import express from 'express';
import {addProduct, listProducts, removeProduct, singleProduct} from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/auth.js';

const productRouter = express.Router();
productRouter.post('/add' , adminAuth, upload.single("image"), addProduct);
productRouter.delete('/remove',adminAuth, removeProduct);
productRouter.post('/single', adminAuth, singleProduct);
productRouter.get('/list', listProducts);

export default productRouter;

