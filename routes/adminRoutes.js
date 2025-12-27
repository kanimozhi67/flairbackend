import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { createTask, getTasks } from "../controllers/adminController.js";
import { getTaskBoard } from "../controllers/taskController.js";

const router = express.Router();

router.post(
  "/createtask",
  authMiddleware, // 🔥 MUST come first
  isAdmin,
createTask);
router.get(
  "/gettask",
  authMiddleware, // 🔥 MUST come first
  isAdmin,
getTasks);


router.get("/taskboard",  authMiddleware, isAdmin, getTaskBoard);
export default router;
