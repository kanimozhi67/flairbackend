import UserProgress from "../models/UserProgress.js";

// In-memory store for generated questions (keyed by id)
const questionsStore = {}; // { [id]: { a, b, operator, answer } }

// Generate multiple random questions
const AddSub = (n, t, req, res, l = 0) => {
  const questions = [];

  // const randomNum = () => Math.floor(Math.random() * t);

  for (let i = 0; i < n; i++) {
    // generate 5 questions
    let a = Math.floor(Math.random() * t) + l; // 0 to t-1
    let b = Math.floor(Math.random() * 10) + l;
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

function addsub3(b, req, res, t) {
  const questions = [];

  let c = 0;
  const ran = [];
  var a = [];
  var q = [];
  const operator = "×"; // or "*"
  let rnum = Math.floor(Math.random() * 2) + 2;
  for (let i = 0; i < 5; i++) {
    // generate 5 questions

    ran[i] = rnum + c;
    c = t;
    rnum = ran[i];
  }
  a = [...ran].sort((a, b) => a - b);
  for (let i = 0; i < 5; i++) {
    q[i] = a[i] * b;
    c = c + t;
  }
  const d = Math.floor(Math.random() * 5);
  const answer = q[d];
  q[d] = null;
  const id = Date.now() + 1; // unique ID
  c = c + t;
  const skip = t;
  // Store question & answer on backend
  questionsStore[id] = { q,  operator, answer };

  // Send only the question to frontend
  questions.push({ id, q, operator });

  res.json({ questions });
}

export function generateQuestionAddSub(req, res) {
  AddSub(5, 10, req, res);
}
// export function generateQuestionAddsub3(req, res) {

//    const t=Math.floor(Math.random() * 4)+2; // 2-5
//    const b = Math.floor(Math.random() * 9)+2; // 3

//   addsub3( b,req, res,t);
// }

export function generateQuestionAddSub3(req, res) {
  // AddSub(3, 15, req, res);
  const t = Math.floor(Math.random() * 4) + 2; // 2-5
  const b = Math.floor(Math.random() * 2) +1 ; // 2

  addsub3(b, req, res, t);
}
export async function checkAddCircle(req, res) {
  const { userId, answers } = req.body;

  if (!Array.isArray(answers)) {
    return res.status(400).json({ error: "Invalid answers format." });
  }

  let score = 0;
  const results = {};

  for (const q of answers) {
    const original = questionsStore[q.id];
    if (!original) continue;

    const isAnswerCorrect = Number(q.answer) === original.answer;
 

    if (isAnswerCorrect) score++;

    results[q.id] = {
      correctAnswer: original.answer,
    userAnswer: q.answer,
  isCorrect: isAnswerCorrect,
    };

    delete questionsStore[q.id]; // cleanup
  }
  score = score * 3;
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

  res.json({ score, results });
}

export function generateQuestionAddSubp(req, res) {
  AddSub(5, 1000, req, res, 100);
}
export function generateQuestionAddSubp3(req, res) {
  AddSub(5, 10000, req, res, 1000);
}

function mult(b, req, res, t = 16) {
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
  mult(2, req, res);
}
export function generateQuestionMul2(req, res) {
  mult(10, req, res);
}
export function generateQuestionMul3(req, res) {
  mult(5, req, res);
}
function mult2(req, res, t, u = 0) {
  const questions = [];

  for (let i = 0; i < 5; i++) {
    // generate 5 questions
    const a = Math.floor(Math.random() * 21); // 0–20
    const b = Math.floor(Math.random() * t) + u;
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
function mult3(b, req, res, t) {
  const questions = [];
  const q = [];
  const mul = b;
  // generate skip-count numbers
  let start = Math.floor(Math.random() * 4) + 2;
  for (let i = 0; i < 5; i++) {
    q.push((start + i * t) * b);
  }

  // choose missing index
  const missingIndex = Math.floor(Math.random() * 5);
  const answer = q[missingIndex];
  q[missingIndex] = null;

  const id = Date.now();

  questionsStore[id] = {
    answer, // ✅ correct value
    mul, // ✅ multiplicand
    skip: t, // ✅ skip value
  };

  questions.push({
    id,
    q,
    mul: b,
    skip: t,
    operator: "×",
  });

  res.json({ questions });
}

export function generateQuestionMulp(req, res) {
  mult(20, req, res, 50);
}
export function generateQuestionMulp2(req, res) {
  mult2(req, res, 11, 2);
}
export function generateQuestionMulp3(req, res) {
  const t = Math.floor(Math.random() * 4) + 2; // 2-5
  const b = Math.floor(Math.random() * 9) + 2; // 0–10
  mult3(b, req, res, t);
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
export async function checkAnswerCircle(req, res) {
  const { userId, answers } = req.body;

  if (!Array.isArray(answers)) {
    return res.status(400).json({ error: "Invalid answers format." });
  }

  let score = 0;
  const results = {};

  for (const q of answers) {
    const original = questionsStore[q.id];
    if (!original) continue;

    const isAnswerCorrect = Number(q.answer) === original.answer;
    const isMulCorrect = Number(q.mul) === original.mul;
    const isSkipCorrect = Number(q.skip) === original.skip;

    if (isAnswerCorrect) score++;
    if (isMulCorrect) score++;
    if (isSkipCorrect) score++;

    results[q.id] = {
      correctAnswer: original.answer,
      correctMul: original.mul,
      correctSkip: original.skip,
      userAnswer: q.answer,
      userMul: q.mul,
      userSkip: q.skip,
      isCorrect: isAnswerCorrect && isMulCorrect && isSkipCorrect,
    };

    delete questionsStore[q.id]; // cleanup
  }
  score = score * 3;
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

  res.json({ score, results });
}
