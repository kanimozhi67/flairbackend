import express from "express";
import auth from "../middleware/authMiddleware.js";
//import { getQuestion } from "../controllers/quizController.js";
import { generateSortingQuestions3,  generateSortingQuestions, checkSortingAnswers, 
    generateSortingQuestions2} from "../controllers/quizcontrollersort.js";
import {   generateQuestionMul, generateQuestionMul2, generateQuestionMul3 } from "../controllers/quizController.js";
import {
  checkAnswer,
  generateQuestionAddSub,
} from "../controllers/quizController.js";
const router = express.Router();

router.get("/math", generateQuestionAddSub);
router.post("/check", checkAnswer);

router.get("/mathlevel2", generateQuestionAddSub2);
//router.post("/check", checkAnswer);
// Endpoint to get new sorting questions
router.get("/sort", generateSortingQuestions);
router.get("/mul", generateQuestionMul);

// Endpoint to submit answers
router.post("/checksort", checkSortingAnswers);

router.get("/sortlevel2", generateSortingQuestions2);

router.get("/sortlevel3", generateSortingQuestions3);
router.get("/mullevel2",  generateQuestionMul2);

router.get("/mullevel3",  generateQuestionMul3);




export default router;