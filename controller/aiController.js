import redisClient from "../config/redis.js";
import Order from "../model/orderModel.js";
import User from "../model/userModel.js"; // ✅ import User model
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export const handleSupport = async (req, res) => {
    try {
        const userId = req.userId;
        const { question } = req.body;

        const cacheKey = `support:${userId}`;

        const cached = await redisClient.get(cacheKey);
        let arr = [];

        if (cached) {
            try {
                arr = JSON.parse(cached);
                if (!Array.isArray(arr)) {
                    arr = []; 
                }
            } catch (err) {
                arr = []; 
            }
        }

        const existing = arr.find(item => item.question === question);
        if (existing) {
            return res.json({ reply: existing.reply });
        }

        let order = null;
        let user = null;

        if (userId) {
            user = await User.findById(userId).lean();
            order = await Order.findOne({
                userId: userId,
                status: { $ne: "Delivered" }
            })
                .sort({ createdAt: -1 })  
                .lean();
        }

        let welcomeMessage = user ? `Welcome ${user.name}! 👋` : "Welcome to ZappShop Support 👋";

        let prompt = `${welcomeMessage}\n\n`;

        switch (question) {
            case "Where is my order?":
                prompt += `You are ZappShop support. Delivery takes 5–7 business days.
        Customer order details:
        - Order ID: ${order?._id}
        - Order Date: ${order?.date
                        ? new Date(order.date).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
                        : "N/A"
                    }
        - Status: ${order?.status}
        
        Answer politely about order status and expected delivery.`;
                break;

            case "What is the delivery time?":
                prompt += `Always mention delivery takes 5–7 business days.`;
                break;

            case "How can I return a product?":
                prompt += `Explain the return process clearly and politely.
        Mention that returns are accepted within 7 days of delivery if product is unused and in original packaging.`;
                break;

            case "My payment failed, what should I do?":
                prompt += `Guide the customer on retrying payment or using another method.
        Mention available payment methods like UPI, cards, or COD.`;
                break;

            case "How do I contact support?":
                prompt += `Provide contact details politely.
        Mention that customers can email support@zappshop.com or call +91-9876543210.`;
                break;

            default:
                prompt += `Delivery takes 5–7 business days.
        Customer asked: ${question}. Answer politely and clearly.`;
                break;
        }

        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: [
                {
                    role: "user",
                    parts: [{ text: prompt }],
                },
            ],
        });

        const reply = response.candidates[0].content.parts[0].text;

        arr.push({ question, reply });

        await redisClient.setEx(cacheKey, 600, JSON.stringify({ reply }));

        res.json({ reply });
    } catch (error) {
        console.error("Support Error:", error);
        res.status(500).json({ error: "Support system error" });
    }
};
