import { v4 as uuidv4 } from "uuid";

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

function removeCells(board, difficulty = 6) {
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
export function generateSudoku(req, res) {
  const board = Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
  fillBoard(board);
  const solution = board.map((row) => [...row]);
  const puzzle = removeCells(board);

  const puzzleId = uuidv4();
  sudokuStore[puzzleId] = { puzzle, solution };

  res.json({ puzzleId, questions: puzzle });
}

// Check Sudoku
export async function checkSudoku(req, res) {
  try {
    const { userId, puzzleId, answers } = req.body;

    if (!puzzleId || !Array.isArray(answers)) {
      return res.status(400).json({ error: "Invalid request format." });
    }

    const puzzleData = sudokuStore[puzzleId];
    if (!puzzleData) {
      return res.status(404).json({ error: "Puzzle not found." });
    }

    const solution = puzzleData.solution;
    let score = 0;
    const correctAnswers = {};

    answers.forEach(({ row, col, value }) => {
      const correctValue = solution[row][col];
      correctAnswers[`${row}-${col}`] = correctValue;
      if (Number(value) === correctValue) score++;
    });

    // Optional: save user progress
    if (userId) {
      try {
        await UserProgress.create({
          user: userId,
          puzzleId,
          score,
          total: SIZE * SIZE,
          date: new Date(),
        });
      } catch (err) {
        console.error("Error saving progress:", err);
      }
    }

    res.json({ score, correctAnswers });
  } catch (err) {
    console.error("checkSudoku error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
}
