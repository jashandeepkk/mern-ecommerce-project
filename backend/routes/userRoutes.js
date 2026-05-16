import express from "express";

import {
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);

router.get("/:id", getSingleUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;