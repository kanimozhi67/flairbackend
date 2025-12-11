import express from "express";
import auth from "../middleware/authMiddleware.js";
import {
  addPoints,
  getTodayPoints,
  getProgressSummary,
} from "../controllers/progressController.js";

const router = express.Router();

// Add points to user's progress
router.post("/addpoints", auth, addPoints);

// Get today's points for the logged-in user
router.get("/today", auth, getTodayPoints);

// Get overall progress summary (weekly, monthly, total, etc.)
router.get("/summary", auth, getProgressSummary);

export default router;
