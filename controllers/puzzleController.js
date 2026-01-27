import UserProgress from "../models/UserProgress.js";

// In-memory store
const puzzleStore = {}; 
// { [puzzleId]: { solution: { A, B, C } } }

/**
 * Generate a single path puzzle
 */
const createPuzzle =(req,res,x=5,y=10,z=5,t=0)=> {
  const puzzleId = Date.now().toString();

  // Randomized but valid puzzle
  const a = Math.floor(Math.random() * x) + 1; // 1–5
  const b = Math.floor(Math.random() * y) + a;
  const c = Math.floor(Math.random() * z) + 1; // 5–9
const A =b-a;
const B=A+c;
const C=B;

  const puzzle = {
    id: puzzleId,

    // Send ONLY structure, not answers
    equations: [
      { left: ["A", "+", a], right:  b},
      { left: ["A", "+", c], right: "B" },
      { left: [ "B", "+",t], right: "C"}
    ],

    inputs: ["A", "B", "C"]
  };

  // Store solution securely
  puzzleStore[puzzleId] = {
    solution: { A, B, C }
  };

  res.json({ puzzle });
}

export function generatePuzzle(req, res) {
  createPuzzle(req,res);
}
export function generatePuzzle2(req, res) {
  createPuzzle(req,res,200,150,200,100);
}
export function generatePuzzle3(req, res) {
  createPuzzle(req,res,15,20,15);
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
