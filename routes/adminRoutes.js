import express from "express";

import { deleteTask } from "../controllers/adminController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { createTask, getTasks } from "../controllers/adminController.js";
import { getTaskBoard } from "../controllers/taskController.js";
import {
  createSchool,
  getSchools,
  deleteSchool,
  createTeacher,
  deleteTeacher,
} from "../controllers/adminSchoolController.js";

const router = express.Router();






// DELETE task
router.delete("/task/:id", deleteTask);


// Schools
router.post("/school", createSchool);
router.get("/schools", getSchools);
router.delete("/school/:schoolId", deleteSchool);

// Teachers
router.post("/teacher", createTeacher);
router.delete("/teacher/:teacherId", deleteTeacher);



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
