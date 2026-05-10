import User from "../model/userModel.js";
import Order from "../model/orderModel.js";

export const getAdmin = async (req, res)=>{
    try {
        let adminEmail = req.adminEmail;
        if(!adminEmail){
            return res.status(404).json({
                message:"Admin is not found"
            })
        }
        return res.status(201).json({
            email:adminEmail,
            role:"admin",
        })
    } catch (error) {
        return res.status(500).json({
                message:"Admin Error",error
            })
    }
}

export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const totalOrdersToday = await Order.countDocuments({
      createdAt: { $gte: today }
    });

    const deliveredOrders = await Order.find({ status: "Delivered" });

    const codEarnings = deliveredOrders
      .filter(o => o.paymentMethod === "COD")
      .reduce((sum, o) => sum + Number(o.amount || 0), 0);

    const razorpayEarnings = deliveredOrders
      .filter(o => o.paymentMethod === "Razorpay")
      .reduce((sum, o) => sum + Number(o.amount || 0), 0);

    const pendingOrdersList = await Order.find({ status: "Order Placed" });
    const pendingAmount = pendingOrdersList.reduce((sum, o) => sum + Number(o.amount || 0), 0);

    const pendingOrders = pendingOrdersList.length;

    res.json({
      totalUsers,
      totalOrdersToday,
      codEarnings,
      razorpayEarnings,
      pendingOrders,
      pendingAmount
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


