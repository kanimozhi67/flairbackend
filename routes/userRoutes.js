import express from "express";
import { getStickers, addStickers } from "../controllers/userController.js";
import { completetask, todaytask } from "../controllers/taskController.js";
import  authMiddleware  from'../middleware/authMiddleware.js'; // verifies JWT

const router = express.Router();



// Add stickers to user
router.post("/:userId/stickers",addStickers);
router.get("/:userId/stickers", getStickers);
// routes/userTasks.js


router.get("/todaytask", authMiddleware, todaytask);
router.post("/completelevel",completetask );



export default router;