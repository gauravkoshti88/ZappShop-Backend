import express from 'express'
import dotenv from 'dotenv'
import dbConnect from './config/dbConnect.js';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();

const app = express();

let port = process.env.PORT || 7000;

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:[
        "http://localhost:5173",
        "http://localhost:5174",
        "https://gauravkoshti88.github.io/zappshop-e-commerce/",
        "https://gauravkoshti88.github.io/zappshop-admin/"
    ],
    credentials:true
}))

app.use('/api', authRoutes)
app.use('/user',userRoutes)
app.use('/admin',adminRoutes)
app.use('/product',productRoutes)
app.use("/cart",cartRoutes);
app.use("/order",orderRoutes);

app.listen(port, ()=>{
    dbConnect();
    console.log(`server is running on http://localhost:${port}`)
})

