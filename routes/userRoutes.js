import express from "express";
import { getStickers, addStickers } from "../controllers/userController.js";

const router = express.Router();



// Add stickers to user
router.post("/:userId/stickers",addStickers);
router.get("/:userId/stickers", getStickers);
export default router;