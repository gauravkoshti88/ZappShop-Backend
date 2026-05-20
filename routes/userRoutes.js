import express from 'express'
import isAuth from '../middleware/isAuth.js';
import { getCurrentUser } from '../controller/userController.js';
import { handleSupport } from '../controller/aiController.js';

const userRoutes = express.Router();

userRoutes.post("/getcurrentuser",isAuth,getCurrentUser)

userRoutes.post("/customer-support",isAuth, handleSupport)

export default userRoutes