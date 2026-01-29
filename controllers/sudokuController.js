import { v4 as uuidv4 } from "uuid";
import Quiz from "../models/Quiz.js";
// In-memory store
const sudokuStore = {};  

const SIZE = 4;
const SUBGRID = 2;

// Utility functions
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function isSafe(board, row, col, num) {
  for (let x = 0; x < SIZE; x++) {
    if (board[row][x] === num || board[x][col] === num) return false;
  }
  const startRow = row - (row % SUBGRID);
  const startCol = col - (col % SUBGRID);
  for (let i = 0; i < SUBGRID; i++) {
    for (let j = 0; j < SUBGRID; j++) {
      if (board[startRow + i][startCol + j] === num) return false;
    }
  }
  return true;
}

function fillBoard(board, row = 0, col = 0) {
  if (row === SIZE) return true;
  if (col === SIZE) return fillBoard(board, row + 1, 0);
  const numbers = shuffle([1, 2, 3, 4]);
  for (let num of numbers) {
    if (isSafe(board, row, col, num)) {
      board[row][col] = num;
      if (fillBoard(board, row, col + 1)) return true;
      board[row][col] = 0;
    }
  }
  return false;
}

function removeCells(board, difficulty = 5) {
  const puzzle = board.map((row) => [...row]);
  let removed = 0;
  while (removed < difficulty) {
    const row = Math.floor(Math.random() * SIZE);
    const col = Math.floor(Math.random() * SIZE);
    if (puzzle[row][col] !== 0) {
      puzzle[row][col] = 0;
      removed++;
    }
  }
  return puzzle;
}

// Generate Sudoku
export async function generateSudoku(req, res) {
  const board = Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
  fillBoard(board);
  const solution = board.map((row) => [...row]);
  const puzzle = removeCells(board);

  const puzzleId = uuidv4();
  // sudokuStore[puzzleId] = { puzzle, solution };
 await Quiz.create({
      id:puzzleId,
     answerStringArr: { puzzle, solution },
      createdAt: new Date(),
    });
  res.json({ puzzleId, questions: puzzle });
}
export async function generateSudoku2(req, res) {
  const board = Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
  fillBoard(board);
  const solution = board.map((row) => [...row]);
  const puzzle = removeCells(board,6);

  const puzzleId = uuidv4();
 // sudokuStore[puzzleId] = { puzzle, solution };
 await Quiz.create({
      id:puzzleId,
     answerStringArr: { puzzle, solution },
      createdAt: new Date(),
    });
  res.json({ puzzleId, questions: puzzle });
}
export async function generateSudoku3(req, res) {
  const board = Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
  fillBoard(board);
  const solution = board.map((row) => [...row]);
  const puzzle = removeCells(board,7);

  const puzzleId = uuidv4();
 // sudokuStore[puzzleId] = { puzzle, solution };
 await Quiz.create({
      id:puzzleId,
     answerStringArr: { puzzle, solution },
      createdAt: new Date(),
    });
  res.json({ puzzleId, questions: puzzle });
}
// Check Sudoku
export async function checkSudoku(req, res) {
  try {
    const { userId, puzzleId, answers } = req.body;

    if (!puzzleId || !Array.isArray(answers)) {
      return res.status(400).json({ error: "Invalid request format." });
    }
 const puzzleData = await Quiz.findOne({ id: puzzleId});
    // const puzzleData = sudokuStore[puzzleId];
    if (!puzzleData) {
      return res.status(404).json({ error: "Puzzle not found." });
    }

    const { puzzle, solution } = puzzleData.answerStringArr;

    let score = 0;
    let total = 0;
    const correctAnswers = {};

    answers.forEach(({ row, col, value }) => {
      // ✅ Only check cells that were originally empty
      if (puzzle[row][col] !== 0) return;

      total++;

      const correctValue = solution[row][col];
      correctAnswers[`${row}-${col}`] = correctValue;

      if (Number(value) === correctValue) {
        score++;
      }
    });
  await Quiz.deleteOne({ id: puzzleId });
    if (userId) {
      try {
        await UserProgress.create({
          user: userId,
          puzzleId,
          score,
          total,
          date: new Date(),
        });
      } catch (err) {
        console.error("Error saving progress:", err);
      }
    }

    res.json({ score, total, correctAnswers });
  } catch (err) {
    console.error("checkSudoku error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
}
