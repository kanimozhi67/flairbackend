import express from "express";
import auth from "../middleware/authMiddleware.js";
//import { getQuestion } from "../controllers/quizController.js";
import {
  generateSortingQuestions3,
  generateSortingQuestions,
  checkSortingAnswers,
  generateSortingQuestions2,
} from "../controllers/quizcontrollersort.js";
import {
  generateSortingQuestionsp3,
  generateSortingQuestionsp,
  generateSortingQuestionsp2,
} from "../controllers/quizcontrollersort.js";
import {
  generateQuestionMul,
  generateQuestionMul2,
  generateQuestionMul3,
  checkAnswerCircle,
  checkAddCircle
} from "../controllers/quizController.js";
import {
  generateQuestionMulp,
  generateQuestionMulp2,
  generateQuestionMulp3,
} from "../controllers/quizController.js";
import {
  checkAnswer,
  generateQuestionAddSub,
  generateQuestionAddSub3,
  generateQuestionAddSubp,
  generateQuestionAddSubp3,
} from "../controllers/quizController.js";
import {
  genMoney,genMoney2,checkAnswerMoney,genWordProblems
} from "../controllers/moneyController.js"
import {
  generateSudoku,
  generateSudoku2,
  generateSudoku3,
  checkSudoku,
} from "../controllers/sudokuController.js";
import {
  generateSudokup,
  generateSudokup2,
  generateSudokup3,
  checkSudokup,
} from "../controllers/psudokuController.js";
import {
  generatePuzzle,
  generatePuzzle2,
  generatePuzzle3,
  checkPuzzle,
} from "../controllers/puzzleController.js";
import {
  generateLogic,
  generateLogic2,
  generateLogic3,
  checkLogic,
} from "../controllers/logicalController.js";
import { generateLogicp } from "../controllers/logicalController.js";

const router = express.Router();

router.get("/math", generateQuestionAddSub);
router.get("/mathp", generateQuestionAddSubp);
router.post("/check", checkAnswer);

router.get("/mathlevel3", generateQuestionAddSub3);
router.get("/mathplevel3", generateQuestionAddSubp3);
//router.post("/check", checkAnswer);
// Endpoint to get new sorting questions
router.get("/sort", generateSortingQuestions);
router.get("/sortlevel2", generateSortingQuestions2);
router.get("/sortlevel3", generateSortingQuestions3);
router.get("/sortp", generateSortingQuestionsp);
router.get("/sortplevel2", generateSortingQuestionsp2);
router.get("/sortplevel3", generateSortingQuestionsp3);

router.get("/mul", generateQuestionMul);
router.get("/mullevel2", generateQuestionMul2);
router.get("/mullevel3", generateQuestionMul3);
router.get("/mulp", generateQuestionMulp);
router.get("/mulplevel2", generateQuestionMulp2);
router.get("/mulplevel3", generateQuestionMulp3);

router.get("/sudoku", generateSudoku);
router.get("/sudokulevel2", generateSudoku2);
router.get("/sudokulevel3", generateSudoku3);
router.get("/sudokup", generateSudokup);
router.get("/sudokuplevel2", generateSudokup2);
router.get("/sudokuplevel3", generateSudokup3);

router.get("/money", genMoney);
router.get("/moneylevel2", genMoney2);
router.get("/moneylevel3", genWordProblems);

router.get("/puzzle", generatePuzzle);
router.get("/puzzlelevel2", generatePuzzle2);
router.get("/puzzlelevel3", generatePuzzle3);

router.get("/logic", generateLogic);
router.get("/logiclevel2", generateLogic2);
router.get("/logiclevel3", generateLogic3);
router.get("/logicp", generateLogicp);
// router.get("/logicplevel2", generateLogicp2);
// router.get("/logicplevel3", generateLogicp3);
// Endpoint to submit answers
router.post("/checksort", checkSortingAnswers);
router.post("/checkmulplevel3", checkAnswerCircle);
router.post("/checkmathlevel3", checkAddCircle);
router.post("/checksudoku", checkSudoku);
router.post("/checkmoney", checkAnswerMoney);

router.post("/checksudokup", checkSudokup);
router.post("/checkpuzzle", checkPuzzle);
router.post("/checklogic", checkLogic);

export default router;
