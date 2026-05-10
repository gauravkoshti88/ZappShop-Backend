import Order from '../model/orderModel.js'
import User from '../model/userModel.js'
import Razorpay from 'razorpay'
import env from 'dotenv'

env.config();

// For Razorpay --->>>>
const currency = 'inr'
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

export const placeOrderRazorpay = async(req, res) => {
    try {
        const {items, amount, address} = req.body;
        const userId = req.userId;
        const orderData = {
            items,
            amount,
            userId,
            address,
            paymentMethod: "Razorpay",
            payment:false,
            date: Date.now()
        }

        const newOrder = new Order(orderData)
        await newOrder.save()

        const options = {
            amount:amount * 100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString()
        }

        await razorpayInstance.orders.create(options, (error, order)=>{
            if(error){
                console.log(error);
                return res.status(500).json(error)
            }
            res.status(200).json(order)
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Razorpay Error",error})
    }
}


export const verifyRazorpay = async (req, res) => {
    try {
        const userId = req.userId;
        const {razorpay_order_id} = req.body;
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if(orderInfo.status === "paid"){
            await Order.findByIdAndUpdate(orderInfo.receipt,{payment:true});
            await User.findByIdAndUpdate(userId, {cartData:{}})
            res.status(200).json({message:"Payment Successful"})
        }else{
            res.json({message:"Payment Failed"})
        }
    } catch (error) {
        console.log("Verify Razorpay Error",error);
        return res.status(500).json({message:"Verify Razorpay Error",error})
    }
}

// For User

export const placeOrder = async (req, res)=>{
    try {
        const {items, amount, address} = req.body;
        const userId = req.userId;
        const orderData = {
            items,
            amount,
            userId,
            address,
            paymentMethod:"COD",
            payment:false,
            date: Date.now()
        }

        const newOrder = new Order(orderData);
        await newOrder.save()

        await User.findByIdAndUpdate(userId,{cartData:{}})

        return res.status(201).json({
            message: "Order Place",
            newOrder
        })


    } catch (error) {
        console.log("Order Place Error",error);
        return res.status(500).json({
            message: "Order Place Error",
            error
        })
    }
}

export const userOrders = async (req, res)=>{
    try {
        const userId = req.userId;
        const orders = await Order.find({userId})
        return res.status(200).json(orders);
    } catch (error) {
        console.log("User Order Error",error);
        return res.status(500).json({message:"userOrders error"})
    }
}



// For Admin

export const allOrders = async(req, res)=>{
    try {
        const orders = await Order.find({})
        res.status(200).json(orders)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"adminAllOrders Error"})
    }
}

export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    // Find order first
    let order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update status
    order.status = status;

    // Agar Delivered hai to payment true kar do
    if (status === "Delivered") {
      order.payment = true; // payment flag true
    }

    await order.save();

    return res.status(201).json({
      message: "Status Updated",
      updated: order,
      paymentMethod: order.paymentMethod // response mein paymentMethod bhej do
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};


