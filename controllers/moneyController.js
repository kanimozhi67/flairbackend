import { v4 as uuidv4 } from "uuid";
import UserProgress from "../models/UserProgress.js";

/**
 * In-memory store
 * key: questionId
 * value: { question, answer }
 */
const questionsStore = {};
const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

const generateOptions = (correct) => {
  const options = new Set([correct]);

  while (options.size < 4) {
    const diff = Math.floor(Math.random() * 200) - 100;
    const fake = Number(correct) + diff;
    if (fake > 0) options.add(fake);
  }

  return shuffle([...options]);
};

const generateQuestion = () => {
  const type = Math.floor(Math.random() * 5);

  switch (type) {
    case 0: {
      const rupee = 1;
      const answer = rupee * 100;
      return {
        question: `${rupee} rupee = ____ paise`,
        answer,
        options: generateOptions(answer)
      };
    }

    case 1: {
      const rupee = Number((Math.random() * 100).toFixed(2));
      const answer = Math.round(rupee * 100);
      return {
        question: `${rupee} rupee = ____ paise`,
        answer,
        options: generateOptions(answer)
      };
    }

    case 2: {
      const paise = Math.floor(Math.random() * 10000) + 100;
      const answer = Number((paise / 100).toFixed(2));
      return {
        question: `${paise} paise = ____ rupee`,
        answer,
        options: generateOptions(answer)
      };
    }
    case 3: {
      const rupee = Math.floor((Math.random() * 100));
      const answer = Math.round(rupee * 100);
      return {
        question: `${rupee} rupee = ____ paise`,
        answer,
        options: generateOptions(answer)
      };
    }
    case 4: {
      const rupee = Math.floor((Math.random() * 100));
      const answer = Math.round(rupee * 100);
      return {
        question: `${rupee} rupee = ____ paise`,
        answer,
        options: generateOptions(answer)
      };
    }

  
    

    default:
      return null;
  }
};


export function genMoney(req, res) {
  const questions = [];

  for (let i = 0; i < 6; i++) {
    const q = generateQuestion();
    if (!q) continue;

    const id = uuidv4();

    questionsStore[id] = q;

    questions.push({
      id,
      question: q.question
    });
  }

  res.json({ questions });
}

/* ------------------ CHECK ANSWERS ------------------ */

export async function checkAnswerMoney(req, res) {
  const { userId, answers } = req.body;

  if (!Array.isArray(answers)) {
    return res.status(400).json({ error: "Invalid answers format." });
  }

  let score = 0;
  const correctAnswers = {};

  for (const q of answers) {
    const original = questionsStore[q.id];
    if (!original) continue;

    correctAnswers[q.id] = original.answer;

    if (Number(q.answer) === Number(original.answer)) {
      score++;
    }

    // remove question after checking
    delete questionsStore[q.id];
  }

  if (userId) {
    try {
      await UserProgress.create({
        user: userId,
        score,
        date: new Date()
      });
    } catch (err) {
      console.error("Error saving progress:", err);
    }
  }

  res.json({
    score,
    total: answers.length,
    correctAnswers
  });
}



// Generate random rupee
const randomRupee = (min = 1, max = 5000) => {
  return +(Math.random() * (max - min) + min).toFixed(2);
};

// Generate a single random arithmetic question
export const gen2Question = () => {
  const types = ["add", "subtract", "multiply", "divide"];
  const type = types[Math.floor(Math.random() * types.length)];

  let questionText = "";
  let answer = 0;

  switch (type) {
    case "add": {
      const a = randomRupee();
      const b = randomRupee();
      questionText = `₹ ${a} ➕ ₹ ${b} = ___`;
      answer = +(a + b).toFixed(2);
      break;
    }
    case "subtract": {
      const a = randomRupee(100, 5000);
      const b = randomRupee(1, a);
      questionText = `₹ ${a} ➖ ₹ ${b} = ___`;
      answer = +(a - b).toFixed(2);
      break;
    }
    case "multiply": {
      const a = randomRupee(1, 100);
      const b = Math.floor(Math.random() * 10) + 1;
      questionText = `₹ ${a} ✖️ ${b} = ___`;
      answer = +(a * b).toFixed(2);
      break;
    }
    case "divide": {
      const b = Math.floor(Math.random() * 9) + 1;
      const a = +(randomRupee(1, 100) * b).toFixed(2);
      questionText = `₹ ${a} ➗ ${b} = ___`;
      answer = +(a / b).toFixed(2);
      break;
    }
  }

  const id = uuidv4();

  // Store question for later answer checking
  questionsStore[id] = { question: questionText, answer };

  return { id, question: questionText, answer };
};

// Example: generate multiple questions
export const generateArithmeticQuiz = (count = 6) => {
  const questions = Array.from({ length: count }, () => gen2Question());
  return questions;
};

// Generate multiple questions
export const genMoney2 = (req, res) => {
  const numQuestions = 6; // or req.query.count
  const questions = Array.from({ length: numQuestions }, gen2Question);

  res.json({ questions });
};



// Helper: generate random rupee with 2 decimals
const randomRupee2 = (min = 10, max = 1000) => {
  return +(Math.random() * (max - min) + min).toFixed(2);
};

// Generate a single word problem
const generateWordProblem = () => {
  const types = ["add", "subtract", "missing_amount", "multiply", "unit_cost"];
  const type = types[Math.floor(Math.random() * types.length)];

  let question = "";
  let answer = 0;

  switch (type) {
    case "add": {
      // Total cost of multiple items
      const items = Array.from({ length: 3 }, () => randomRupee2(20, 1000));
      const names = ["belt", "socks", "shirt", "hat", "shoes"];
      const selectedItems = items.map((amt, i) => `${names[i % names.length]} for ₹${amt}`);
      question = `A girl bought ${selectedItems.join(", ")}. Find the total amount of money she spent.`;
      answer = items.reduce((acc, val) => acc + val, 0).toFixed(2);
      break;
    }

    case "subtract": {
      // Change back after paying
      const cost = randomRupee(50, 500);
      const paid = +(cost + Math.random() * 100).toFixed(2);
      question = `A boy bought an item for ₹${cost}. He gives ₹${paid} note. Find the balance he should get back.`;
      answer = (paid - cost).toFixed(2);
      break;
    }

    case "missing_amount": {
      // Find total cost given what user has and additional needed
      const has = randomRupee(50, 500);
      const needed = randomRupee(50, 500);
      const total = +(has + needed).toFixed(2);
      question = `A dad has ₹${has} with him. He needs ₹${needed} more to buy a shirt. What is the cost of the shirt?`;
      answer = total.toFixed(2);
      break;
    }

    case "multiply": {
      // Cost of multiple packs
      const unit = randomRupee(5, 50);
      const qty = Math.floor(Math.random() * 10) + 2;
      question = `A pack of crayons costs ₹${unit}. Find the cost of ${qty} such packs.`;
      answer = (unit * qty).toFixed(2);
      break;
    }

    case "unit_cost": {
      // Cost per item given total cost
      const qty = Math.floor(Math.random() * 10) + 2;
      const total = +(randomRupee(20, 200) * qty).toFixed(2);
      question = `The total cost of ${qty} packets of colour pencils is ₹${total}. Find the cost of one packet.`;
      answer = (total / qty).toFixed(2);
      break;
    }
  }

  const id = uuidv4();


  // Store question for later answer checking
  questionsStore[id] = { question, answer };

  return { id, question, answer };
};

// Generate multiple word problems
export const genWordProblems = (req, res) => {
  const count = req.query.count ? parseInt(req.query.count) : 6;
  const questions = Array.from({ length: count }, () => generateWordProblem());
  res.json({ questions });
};

// Example Express setup
// import express from "express";
// import { generateWordProblems } from "./moneyWordProblemController.js";
// const app = express();
// app.get("/quiz/money-word-problems", generateWordProblems);
// app.listen(3000, () => console.log("Server running on port 3000"));
