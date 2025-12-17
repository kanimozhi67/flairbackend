
import UserProgress from "../models/UserProgress.js";

// In-memory store for generated sorting questions
const questionsStore = {}; // { [id]: { numbers, answer } }

const shapes = ["🟪", "⭐", "💛", "💎", "⭕", "🟢"];
const heart =  ["❤️", "💛", "💚", "💙", "💜", "🖤", "🤍"];
const arrow = [  "⬅️",  "➡️",  "⬆️",   "⬇️",  "🔄" ] ;


const genques = (req,res,emoji)=>{
   const shuffled = [...emoji].sort(() => 0.5 - Math.random());
  const base = shuffled.slice(0, 3);

  const repeat = Math.floor(Math.random() * 3) + 2; // 2–4 times
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

  const questionId = Date.now().toString();

  questionsStore[questionId] = {
    answer: answers,
  };

  res.json({
    id: questionId,
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


export async function checkLogic(req, res) {
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

    const userAnswer = q.answer;
    const correct = original.answer;

    const isCorrect =
      userAnswer &&
      Object.keys(correct).every(
        key => userAnswer[key] === correct[key]
      );

    if (isCorrect) score++;
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
