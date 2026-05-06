import express from 'express';
import isAuth from '../middleware/isAuth.js';
import { addToCart, getUserCart, updateCart } from '../controller/cartController.js';

const cartRoutes = express.Router();

cartRoutes.post("/addtocart",isAuth,addToCart);
cartRoutes.post("/updatecart",isAuth,updateCart);
cartRoutes.post("/getusercart",isAuth,getUserCart);


export default cartRoutes;

