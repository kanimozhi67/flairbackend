import Quiz from "../models/Quiz.js";
import UserProgress from "../models/UserProgress.js";
import { v4 as uuidv4 } from "uuid";

// In-memory store for generated sorting questions
const questionsStore = {}; // { [id]: { numbers, answer } }

const shapes = ["🟪", "⭐", "💛", "💎", "⭕", "🟢"];
const heart =  ["❤️", "💛", "💚", "💙", "💜", "🖤", "🤍"];
const arrow = [  "⬅️",  "➡️",  "⬆️",   "⬇️",  "🔄" ] ;
const fullarrow=["↗️","↘️","↙️","↖️","⬅️", "➡️", "⬆️","⬇️","🔄" ]

const genques = async(req,res,emoji,t=2)=>{
   const shuffled = [...emoji].sort(() => 0.5 - Math.random());
  const base = shuffled.slice(0, 4);

  const n = Math.floor(Math.random() * 2) + t; // 2–3 times
 
const repeat=( n % 2 === 0 ? n + 1 : n);

  let pattern = Array(repeat).fill().flatMap(() => base);

  const blockSize = base.length;
  const blockIndex = Math.floor(Math.random() * repeat);
  const fillIndex =
    blockIndex * blockSize + Math.floor(Math.random() * (blockSize - 1));

  const answers = {
    [fillIndex]: pattern[fillIndex],
    [fillIndex + 1]: pattern[fillIndex + 1],
  };

  pattern[fillIndex] = "❓";
  pattern[fillIndex + 1] = "❓";

  // const questionId = Date.now().toString();
 const id = uuidv4();
  // questionsStore[questionId] = {
  //   answer: answers,
  // };
   await Quiz.create({
      id,
    
      answerStringArr: answers,
      createdAt: new Date(),
    });

  res.json({
    id,
    pattern,
  });
}

export function generateLogic(req, res) {
 genques(req,res,shapes)
}
export function generateLogic2(req, res) {
 genques(req,res,heart)
}
export function generateLogic3(req, res) {
 genques(req,res,arrow)
}
export function generateLogicp(req, res) {
 genques(req,res,fullarrow)
}



export async function checkLogic(req, res) {
  const { userId, answers } = req.body;

  if (!answers || !Array.isArray(answers)) {
    return res.status(400).json({ error: "Invalid answers format." });
  }

  let score = 0;
  const correctAnswers = {};

  for (const q of answers) {
    // const original = questionsStore[q.id];
      const original = await Quiz.findOne({ id: q.id });
    if (!original) continue;

    correctAnswers[q.id] = original.answerStringArr;

    const userAnswer = q.answer;
    const correct = original.answerStringArr;

    const isCorrect =
      userAnswer &&
      Object.keys(correct).every(
        key => userAnswer[key] === correct[key]
      );

    if (isCorrect) score++;
      await Quiz.deleteOne({ id: q.id });
  }

  // Save progress
  if (userId) {
    try {
      await UserProgress.create({
        user: userId,
        score,
        type: "logic",
        date: new Date(),
      });
    } catch (err) {
      console.error("Error saving logic progress:", err);
    }
  }

  res.json({ score, correctAnswers });
}
