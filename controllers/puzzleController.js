import UserProgress from "../models/UserProgress.js";

// In-memory store
const puzzleStore = {}; 
// { [puzzleId]: { solution: { A, B, C } } }

/**
 * Generate a single path puzzle
 */
export function generatePuzzle(req, res) {
  const puzzleId = Date.now().toString();

  // Randomized but valid puzzle
  const a = Math.floor(Math.random() * 5) + 1; // 1–5
  const b = Math.floor(Math.random() * 10) + 5;
  const c = Math.floor(Math.random() * 5) + 1; // 5–9
const A =b-a;
const B=A+c;
const C=B;

  const puzzle = {
    id: puzzleId,

    // Send ONLY structure, not answers
    equations: [
      { left: ["A", "+", a], right:  b},
      { left: ["A", "+", c], right: "B" },
      { left: [ "B", "+",0], right: "C"}
    ],

    inputs: ["A", "B", "C"]
  };

  // Store solution securely
  puzzleStore[puzzleId] = {
    solution: { A, B, C }
  };

  res.json({ puzzle });
}

export async function checkPuzzle(req, res) {
  const { userId, puzzleId, answers } = req.body;

  if (!puzzleId || !answers) {
    return res.status(400).json({ error: "Invalid payload" });
  }

  const puzzle = puzzleStore[puzzleId];
  if (!puzzle) {
    return res.status(404).json({ error: "Puzzle not found" });
  }

  let score = 0;
  const correctAnswers = {};

  // Convert answers array to object if needed
  const answersObj = Array.isArray(answers)
    ? answers.reduce((acc, a) => {
        acc[a.id] = a.answer;
        return acc;
      }, {})
    : answers;

  for (const key in puzzle.solution) {
    correctAnswers[key] = puzzle.solution[key];

    const userAns = answersObj[key];

    // Compare numbers if possible, else strings
    if (
      (!isNaN(Number(userAns)) && !isNaN(Number(puzzle.solution[key]))
        ? Number(userAns) === Number(puzzle.solution[key])
        : String(userAns).trim() === String(puzzle.solution[key]).trim())
    ) {
      score++;
    }
  }

  const total = Object.keys(puzzle.solution).length;

  // Save progress
  if (userId) {
    try {
      await UserProgress.create({
        user: userId,
        score,
        total,
        date: new Date(),
      });
    } catch (err) {
      console.error("Progress save error:", err);
    }
  }

  res.json({
    score,
    total,
    correctAnswers,
  });
}
