import UserProgress from "../models/UserProgress.js";

// In-memory store for generated questions (keyed by id)
const questionsStore = {}; // { [id]: { a, b, operator, answer } }

// Generate multiple random questions
const AddSub = (n, t, req, res) => {
  const questions = [];

  // const randomNum = () => Math.floor(Math.random() * t);

  for (let i = 0; i < n; i++) {
    // generate 5 questions
    let a = Math.floor(Math.random() * t);
    let b = Math.floor(Math.random() * 10);
    const operator = Math.random() < 0.5 ? "+" : "-";

    // Prevent negative subtraction
    if (operator === "-" && b > a) [a, b] = [b, a];

    const answer = operator === "+" ? a + b : a - b;
    const id = Date.now() + i; // unique ID

    // Store question in memory
    questionsStore[id] = { a, b, operator, answer };

    // Send only necessary info to frontend (no answer)
    questions.push({ id, a, b, operator });
  }

  res.json({ questions });
};
export function generateQuestionAddSub(req, res) {
  AddSub(5, 10, req, res);
}

export function generateQuestionAddSub3(req, res) {
  AddSub(3, 15, req, res);
}

function mult(b, req, res) {
  const questions = [];

  const randomNum = () => Math.floor(Math.random() * 16); // 0–15

  for (let i = 0; i < 5; i++) {
    // generate 5 questions
    const a = randomNum();

    const operator = "×"; // or "*"

    const answer = a * b;
    const id = Date.now() + i; // unique ID

    // Store question & answer on backend
    questionsStore[id] = { a, b, operator, answer };

    // Send only the question to frontend
    questions.push({ id, a, b, operator });
  }

  res.json({ questions });
}
export function generateQuestionMul(req, res) {
  mult(10, req, res);
}
export function generateQuestionMul2(req, res) {
  mult(10, req, res);
}
export function generateQuestionMul3(req, res) {
  mult(5, req, res);
}
// Check user's submitted quiz answers
export async function checkAnswer(req, res) {
  const { userId, answers } = req.body;

  if (!answers || !Array.isArray(answers)) {
    return res.status(400).json({ error: "Invalid answers format." });
  }

  let score = 0;
  const correctAnswers = {}; // NEW

  for (const q of answers) {
    const original = questionsStore[q.id];
    if (!original) continue;

    correctAnswers[q.id] = original.answer; // SEND correct answer

    if (q.answer === original.answer) score++;
  }

  // Save progress
  if (userId) {
    try {
      await UserProgress.create({
        user: userId,
        score,
        date: new Date(),
      });
    } catch (err) {
      console.error("Error saving progress:", err);
    }
  }

  res.json({ score, correctAnswers }); // SEND IT!
}


