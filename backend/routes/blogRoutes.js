import express from "express";

import upload from "../middleware/uploadMiddleware.js";

import {
  createBlog,
  getBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";

const router = express.Router();


router.get("/", getBlogs);


router.get("/:id", getSingleBlog);


router.post(
  "/create",
  upload.single("image"),
  createBlog
);


router.put("/:id", updateBlog);


router.delete("/:id", deleteBlog);

export default router;