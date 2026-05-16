import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

export const getAdminDashboard = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();

    const totalProducts = await Product.countDocuments();

    const totalUsers = await User.countDocuments();

    const orders = await Order.find();

    const totalRevenue = orders.reduce(
      (acc, item) => acc + item.totalPrice,
      0
    );
     
    const monthlySales = [
      { name: "Jan", sales: 12000 },
      { name: "Feb", sales: 18000 },
      { name: "Mar", sales: 9000 },
      { name: "Apr", sales: 22000 },
      { name: "May", sales: 30000 },
      { name: "Jun", sales: 26000 },
    ];

    const delivered = await Order.countDocuments({
      status: "Delivered",
    });

    const pending = await Order.countDocuments({
      status: "Pending",
    });

    const cancelled = await Order.countDocuments({
      status: "Cancelled",
    });

    const orderStatus = [
      {
        name: "Delivered",
        value: delivered,
      },
      {
        name: "Pending",
        value: pending,
      },
      {
        name: "Cancelled",
        value: cancelled,
      },
    ];

    const recentOrders = await Order.find()
      .populate("user")
      .sort({ createdAt: -1 })
      .limit(10);
      const products = await Product.find()
      .populate("vendor")
      .sort({ createdAt: -1 });

    const users = await User.find().select(
  "name email role storeName createdAt"
);
const vendors = await User.find({
  role: "vendor",
}).select(
  "name email role storeName createdAt isApproved"
);


console.log(vendors);
    
    res.json({
      totalOrders,
      totalRevenue,
      totalProducts,
      totalUsers,
      monthlySales,
      orderStatus,
      recentOrders,
      products,
      users,
      vendors,
    });
  } catch (error) {
 res.status(500).json({
      message: error.message,
    })
  }
};
export const deleteUser = async (req, res) => {
  try {

    const user = await User.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "User deleted successfully",
      user,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

export const approveVendor = async (req, res) => {
  try {

    const vendor = await User.findByIdAndUpdate(
      req.params.id,
      {
        isApproved: true,
      },
     {
  returnDocument: "after",
}
    );
    console.log(vendor);


    res.json({
      message: "Vendor approved successfully",
      vendor,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};