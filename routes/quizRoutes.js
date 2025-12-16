import express from "express";
import auth from "../middleware/authMiddleware.js";
//import { getQuestion } from "../controllers/quizController.js";
import { generateSortingQuestions3,  generateSortingQuestions, checkSortingAnswers, 
    generateSortingQuestions2} from "../controllers/quizcontrollersort.js";
import {   generateQuestionMul, generateQuestionMul2, generateQuestionMul3 } 
     from "../controllers/quizController.js";
import { checkAnswer, generateQuestionAddSub,generateQuestionAddSub3,
} from "../controllers/quizController.js";
import { generateSudoku, generateSudoku2, generateSudoku3, checkSudoku} from "../controllers/sudokuController.js";
import { generatePuzzle,generatePuzzle2,generatePuzzle3,checkPuzzle } from "../controllers/puzzleController.js";
import {generateLogic} from "../controllers/logicalController.js"

const router = express.Router();

router.get("/math", generateQuestionAddSub);
router.post("/check", checkAnswer);

router.get("/mathlevel3", generateQuestionAddSub3);
//router.post("/check", checkAnswer);
// Endpoint to get new sorting questions
router.get("/sort", generateSortingQuestions);
router.get("/mul", generateQuestionMul);
router.get("/sudoku", generateSudoku);
router.get("/sudokulevel2", generateSudoku2);
router.get("/sudokulevel3", generateSudoku3);
router.get("/puzzle", generatePuzzle);
router.get("/puzzlelevel2", generatePuzzle2);
router.get("/puzzlelevel3", generatePuzzle3);
router.get("/logic", generateLogic);
// Endpoint to submit answers
router.post("/checksort", checkSortingAnswers);
router.post("/checksudoku", checkSudoku);
router.post("/checkpuzzle", checkPuzzle);

router.get("/sortlevel2", generateSortingQuestions2);

router.get("/sortlevel3", generateSortingQuestions3);
router.get("/mullevel2",  generateQuestionMul2);

router.get("/mullevel3",  generateQuestionMul3);




export default router;