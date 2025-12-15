import UserProgress from "../models/UserProgress.js";

// In-memory store for generated sorting questions
const questionsStore = {}; // { [id]: { numbers, answer } }

// Generate multiple random sorting questions with unique numbers
export function generateSortingQuestions(req, res) {
  const questions = [];

  const randomNum = (exclude = []) => {
    let num;
    do {
      num = Math.floor(Math.random() * 20); // numbers between 0–19
    } while (exclude.includes(num));
    return num;
  };

  for (let i = 0; i < 1; i++) { // generate 5 questions
    const length = 3 + Math.floor(Math.random() * 3); // 3 to 5 numbers
    const numbers = [];

    while (numbers.length < length) {
      numbers.push(randomNum(numbers)); // ensures uniqueness
    }

    const answer = [...numbers].sort((a, b) => a - b); // correct ascending order
    const id = Date.now() + i; // unique ID

    // Store question in memory
    questionsStore[id] = { numbers, answer };

    // Send only numbers to frontend (no answer)
    questions.push({ id, numbers });
  }

  res.json({ questions });
}

// Check user's submitted sorting answers
export async function checkSortingAnswers(req, res) {
  const { userId, answers } = req.body;

  if (!answers || !Array.isArray(answers)) {
    return res.status(400).json({ error: "Invalid answers format." });
  }

  let score = 0;
  const correctAnswers = {};

  for (const q of answers) {
    const original = questionsStore[q.id];
    if (!original) continue;

    correctAnswers[q.id] = original.answer;

    // Compare user's answer array with correct answer array
    const isCorrect =
      Array.isArray(q.answer) &&
      q.answer.length === original.answer.length &&
      q.answer.every((num, idx) => num === original.answer[idx]);

    if (isCorrect) score++;
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

  res.json({ score, correctAnswers });
}

// Generate Level 2 sorting questions (numbers up to 100)
export function generateSortingQuestions2(req, res) {
  const questions = [];

  const randomNum = (exclude = []) => {
    let num;
    do {
      num = Math.floor(Math.random() * 50) + 1; // 1–100
    } while (exclude.includes(num));
    return num;
  };

  for (let i = 0; i < 1; i++) {
    const length = 4 + Math.floor(Math.random() * 2); // 4 or 5 numbers
    const numbers = [];

    while (numbers.length < length) {
      numbers.push(randomNum(numbers)); // unique numbers
    }

    const answer = [...numbers].sort((a, b) => a - b); // ascending
    const id = Date.now() + i;

    questionsStore[id] = { numbers, answer };

    questions.push({ id, numbers });
  }

  res.json({ questions });
}


// Generate Level 2 sorting questions (numbers up to 100)
export function generateSortingQuestions3(req, res) {
  const questions = [];

  const randomNum = (exclude = []) => {
    let num;
    do {
      num = Math.floor(Math.random() * 100) + 1; // 1–100
    } while (exclude.includes(num));
    return num;
  };

  for (let i = 0; i < 1; i++) {
    const length = 4 + Math.floor(Math.random() * 2); // 4 or 5 numbers
    const numbers = [];

    while (numbers.length < length) {
      numbers.push(randomNum(numbers)); // unique numbers
    }

    const answer = [...numbers].sort((a, b) => a - b); // ascending
    const id = Date.now() + i;

    questionsStore[id] = { numbers, answer };

    questions.push({ id, numbers });
  }

  res.json({ questions });
}
