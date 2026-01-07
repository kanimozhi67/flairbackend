import express from "express";
import { getStickers, addStickers } from "../controllers/userController.js";
import { completetask, completetaskStudent, todaytask, todaytaskStudent } from "../controllers/taskController.js";
import  authMiddleware  from'../middleware/authMiddleware.js'; // verifies JWT

const router = express.Router();



// Add stickers to user
router.post("/:userId/stickers",addStickers);
router.get("/:userId/stickers", getStickers);
// routes/userTasks.js


router.get("/todaytask", authMiddleware, todaytask);
router.get("/todaytaskstudent", authMiddleware, todaytaskStudent);
router.post("/completetask",authMiddleware,completetask );
router.post("/completetaskstudent",authMiddleware,completetaskStudent );



export default router;