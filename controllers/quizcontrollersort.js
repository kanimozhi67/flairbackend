import UserProgress from "../models/UserProgress.js";

// In-memory store for generated sorting questions
const questionsStore = {}; // { [id]: { numbers, answer } }

// Generate multiple random sorting questions with unique numbers
const genQues=(req,res,n,t=0)=>{
   const questions = [];

  const randomNum = (exclude = []) => {
    let num;
    do {
      num = Math.floor(Math.random() * n)+t; // numbers between 0–19
    } while (exclude.includes(num));
    return num;
  };

  for (let i = 0; i < 1; i++) { // generate 5 questions
    const length = 3 + Math.floor(Math.random() * 3); // 4 to 5 numbers
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
export function generateSortingQuestions(req, res) {
 genQues(req,res,20);
}

export function generateSortingQuestions2(req, res) {
  genQues(req,res,50)
}

export function generateSortingQuestions3(req, res) {
 
 genQues(req,res,100)
  
}
export function generateSortingQuestionsp(req, res) {
 genQues(req,res,1000,100);
}

export function generateSortingQuestionsp2(req, res) {
  genQues(req,res,2000,500)
}

export function generateSortingQuestionsp3(req, res) {
 
 genQues(req,res,10000,1000)
  
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

