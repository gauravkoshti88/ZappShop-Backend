import express from 'express'
import { getAdmin } from '../controller/adminController.js';
import adminAuth from '../middleware/adminAuth.js';

const adminRoutes = express.Router();

adminRoutes.get('/getadmin',adminAuth,getAdmin);

export default adminRoutes;