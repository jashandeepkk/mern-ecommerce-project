import express from "express";
import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import {
  getAdminDashboard,
  deleteUser,
  approveVendor,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/dashboard", async (req, res) => {
  try {
    const totalUsers =
      await User.countDocuments();

    const totalProducts =
      await Product.countDocuments();

    const totalOrders =
      await Order.countDocuments();

    const orders = await Order.find()
      .populate("user")
      .sort({ createdAt: -1 });

    const products = await Product.find()
      .populate("vendor")
      .sort({ createdAt: -1 });

    const totalRevenue = orders.reduce(
      (acc, item) =>
        acc + (item.totalPrice || 0),
      0
    );

    const users = await User.find().select(
      "name email role createdAt"
    );

    const vendors = await User.find({
      role: "vendor",
    }).select("name email");

    const vendorData = await Promise.all(
      vendors.map(async (vendor) => {
        const vendorProducts =
          await Product.countDocuments({
            vendor: vendor._id,
          });

        const vendorOrders =
          await Order.find({
            "items.vendor": vendor._id,
          });

        let sales = 0;

        vendorOrders.forEach((order) => {
          sales +=
            order.totalPrice || 0;
        });

        return {
          _id: vendor._id,
          name: vendor.name,
          email: vendor.email,
          products: vendorProducts,
          sales,
        };
      })
    );

    const recentOrders = orders.slice(
      0,
      10
    );

    const monthlySales = [
      { name: "Jan", sales: 12000 },
      { name: "Feb", sales: 18000 },
      { name: "Mar", sales: 9000 },
      { name: "Apr", sales: 22000 },
      { name: "May", sales: 30000 },
      { name: "Jun", sales: 26000 },
    ];

    const delivered =
      await Order.countDocuments({
        status: "Delivered",
      });

    const pending =
      await Order.countDocuments({
        status: "Pending",
      });

    const cancelled =
      await Order.countDocuments({
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

    res.json({
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue,

      users,

      vendors: vendorData,

      products,

      recentOrders,

      monthlySales,

      orderStatus,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});
router.delete(
  "/user/:id",
  deleteUser
);

router.put(
  "/vendor/approve/:id",
  approveVendor
);

export default router;

