import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { createtask, getTasks } from "../controllers/adminController.js";

const router = express.Router();

router.post(
  "/createtask",
  authMiddleware, // 🔥 MUST come first
  isAdmin,
createtask);
router.get(
  "/gettask",
  authMiddleware, // 🔥 MUST come first
  isAdmin,
getTasks);

export default router;
