import express from "express";

import { deleteTask, deleteUser, feedback, getAllUser, joinform, updateUser, updateUserScore } from "../controllers/adminController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/isAdmin.js";
import {  isSchoolAdmin } from "../middleware/isSchoolAdmin.js";
import { createTask, getTasks , screateTask,sgetTasks} from "../controllers/adminController.js";
import { getTaskBoard, getTaskBoardStudent } from "../controllers/taskController.js";
import {
  createSchool,
  getSchools,
  deleteSchool,
  createTeacher,
  deleteTeacher,
  updateTeacher,
  createSchoolAdmin,
  updateStudent,
  deleteStudent,
 
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
router.post("/schooladmin",authMiddleware, isAdmin , createSchoolAdmin);
router.put("/teacheredit/:id", updateTeacher);
router.delete("/teacher/:teacherId", deleteTeacher);
router.put("/studentedit/:id", updateStudent);
router.delete("/student/:studentId", deleteStudent);



router.post(
  "/createtask",
  authMiddleware, // 🔥 MUST come first
  isAdmin,
createTask);``
router.get(
  "/gettask",
  authMiddleware, // 🔥 MUST come first
  isAdmin,
getTasks);
router.post(
  "/screatetask",
 // authMiddleware, // 🔥 MUST come first
 // isSchoolAdmin,
screateTask);
router.get(
  "/sgettask",
 // authMiddleware, // 🔥 MUST come first
 // isSchoolAdmin,
sgetTasks);
router.get("/getalluser",getAllUser)
router.post("/joinform",joinform)
router.post("/feedback",feedback)


router.put("/updateuser/:id",authMiddleware, isAdmin, updateUser);
router.put("/updatescore/:id",authMiddleware, isAdmin, updateUserScore);
router.delete("/deleteuser/:id",authMiddleware, isAdmin, deleteUser);

// router.post("/createcheckoutsession", createCheckoutSession);

// router.post("/create-payment-intent", createPaymentIntent);

router.get("/taskboard",  authMiddleware, isAdmin, getTaskBoard);
router.get("/taskboardstudent",   getTaskBoardStudent);
export default router;
