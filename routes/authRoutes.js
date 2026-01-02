import express from "express";
import { signup, studentSignup,studentLogin, login, logout ,getMe, teacherLogin} from "../controllers/authController.js";
import authMiddleware from'../middleware/authMiddleware.js'; // verifies JWT


const router = express.Router();

router.post("/signup", signup);
router.post("/studentSignup", studentSignup);
router.post("/login", login);
router.post("/teacherlogin", teacherLogin);
router.post("/studentlogin", studentLogin);
router.post("/logout", logout);
router.get("/getMe",authMiddleware, getMe);



export default router;