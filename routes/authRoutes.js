import express from "express";
import { signup, studentSignup,studentLogin, login, logout ,getMe, teacherLogin, schoolAdminLogin, forgotPassword} from "../controllers/authController.js";
import authMiddleware from'../middleware/authMiddleware.js'; // verifies JWT
import { isSchoolAdmin } from "../middleware/isSchoolAdmin.js";


const router = express.Router();

router.post("/signup", signup);
router.post("/studentSignup", studentSignup);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.post("/teacherlogin", teacherLogin);
router.post("/schooladminlogin", schoolAdminLogin);
router.post("/studentlogin", studentLogin);
router.post("/logout", logout);
router.get("/getMe",authMiddleware, getMe);



export default router;