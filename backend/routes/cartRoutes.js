import express from "express";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

import {
  getCart,
  addToCart,
  removeFromCart,
  updateQty,
  clearCart,
} from "../controllers/cartController.js";

router.get("/", protect, getCart);

router.post("/add", protect, addToCart);

router.post("/remove", protect, removeFromCart);

router.post("/update", protect, updateQty);
router.delete(
  "/clear",
  protect,
  clearCart
);
export default router;