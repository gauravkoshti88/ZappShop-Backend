import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

const dbConnect = async (req, res)=>{
    try {
        let connectDB = await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database Connected")
    } catch (error) {
        return res.status(500).json({
            message: "Database connection failed",error
        })
    }
}

export default dbConnect