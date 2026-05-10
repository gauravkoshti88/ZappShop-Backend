import express from 'express'
import { getAdmin, getDashboardStats } from '../controller/adminController.js';
import adminAuth from '../middleware/adminAuth.js';

const adminRoutes = express.Router();

adminRoutes.get('/getadmin',adminAuth,getAdmin);
adminRoutes.get("/getDashboardStats", adminAuth, getDashboardStats);

export default adminRoutes;