import express from 'express';
import isAuth from '../middleware/isAuth.js'
import { allOrders, getOrderStatus, placeOrder, placeOrderRazorpay, updateStatus, userOrders, verifyRazorpay } from '../controller/orderController.js';
import adminAuth from '../middleware/adminAuth.js'

const orderRoutes = express.Router();

// For User
orderRoutes.post("/placeorder",isAuth,placeOrder);
orderRoutes.post("/userorder",isAuth,userOrders);
orderRoutes.get("/order-status/:orderId", isAuth, getOrderStatus)

// For Razorpay Payment
orderRoutes.post("/razorpay",isAuth,placeOrderRazorpay);

orderRoutes.post("/verifyrazorpay",isAuth,verifyRazorpay);

// For Admin
orderRoutes.post("/allorders",adminAuth,allOrders);
orderRoutes.post("/updatestatus",adminAuth,updateStatus)

export default orderRoutes;