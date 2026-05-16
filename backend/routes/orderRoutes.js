import express from "express";

import {
  createOrder,
  getOrders,
  getSingleOrder,
  updateOrderStatus,
  deleteOrder,
  getVendorOrders,
} from "../controllers/orderController.js";

import {
  protect,
  vendorOnly,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  createOrder
);

router.get(
  "/",
  protect,
  getOrders
);

/* IMPORTANT */
router.get(
  "/vendor",
  protect,
  vendorOnly,
  getVendorOrders
);

router.get(
  "/:id",
  protect,
  getSingleOrder
);

router.put(
  "/:id",
  protect,
  updateOrderStatus
);

router.delete(
  "/:id",
  protect,
  deleteOrder
);

export default router;