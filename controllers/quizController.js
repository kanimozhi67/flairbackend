import UserProgress from "../models/UserProgress.js";

// In-memory store for generated questions (keyed by id)
const questionsStore = {}; // { [id]: { a, b, operator, answer } }

// Generate multiple random questions
const AddSub = (n, t, req, res,l=0) => {
  const questions = [];

  // const randomNum = () => Math.floor(Math.random() * t);

  for (let i = 0; i < n; i++ ) {
    // generate 5 questions
    let a = Math.floor(Math.random() * t)+l;// 0 to t-1
    let b = Math.floor(Math.random() * 10)+l;
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
export function generateQuestionAddSubp(req, res) {
  AddSub(5, 1000, req, res,100);
}
export function generateQuestionAddSubp3(req, res) {
  AddSub(5, 10000, req, res,1000);
}

function mult(b, req, res,t=16) {
  const questions = [];

  

  for (let i = 0; i < 5; i++) {
    // generate 5 questions
    const a = Math.floor(Math.random() * t); // 0–15

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
function mult2( req, res,t,u=0) {
  const questions = [];

  

  for (let i = 0; i < 5; i++) {
    // generate 5 questions
    const a = Math.floor(Math.random() * 21); // 0–20
 const b=Math.floor(Math.random() * t)+u; 
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
export function generateQuestionMulp(req, res) {
  mult(20, req, res,50);
}
export function generateQuestionMulp2(req, res) {
   
  mult2( req, res,9,2);
}
export function generateQuestionMulp3(req, res) {
  // const x=Math.floor(Math.random() * 6)+6; // 6-12
  mult2( req, res,6,6);
}

export async function checkAnswer(req, res) {
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

    if (Number(q.answer) === original.answer) score++;

    // Optional: remove question from store after checking
    delete questionsStore[q.id];
  }

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


