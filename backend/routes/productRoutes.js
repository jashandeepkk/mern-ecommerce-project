import express from "express";
import upload from "../middleware/uploadMiddleware.js";

import {
  addProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getVendorProducts,
} from "../controllers/productController.js";

import {
  protect,
  vendorOnly,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/vendor",
  protect,
  vendorOnly,
  getVendorProducts
);

router.post(
  "/",
  protect,
  vendorOnly,
  upload.array("images", 5),
  addProduct
);

router.get("/", getProducts);

router.get("/:id", getSingleProduct);

router.put(
  "/:id",
  protect,
  vendorOnly,
  updateProduct
);

router.delete(
  "/:id",
  protect,
  vendorOnly,
  deleteProduct
);

export default router;