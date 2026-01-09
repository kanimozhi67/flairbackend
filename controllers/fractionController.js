// fractionQuestions.js
// fractionQuizController.js
import { v4 as uuidv4 } from "uuid";

import UserProgress from "../models/UserProgress.js";

const questionsStore = {};
export const analyticalEmojiQuizpuzz3= [
  {
    text: "├ ",
    answer: "┤",
    options: ["├", "┼", "┤", "│"]
  },
  {
    text: "┬",
    answer: "┴",
    options: ["┬", "┴", "┤", "│"]
  },
  {
    text: "🔻 ",
    answer: "🔺",
    options: ["🔺", "🔷", "🔴", "🔻"]
  },
  {
    text: "◐ ",
    answer: "◑",
    options: ["◐", "◒", "◑", "◓"]
  },
  {
    text: "◓ ",
    answer: "◒",
    options: ["◐", "◒", "◑", "◓"]
  },
  {
    text: "▨",
    answer: "▧",
    options: ["▥", "▨", "▧", "▤"]
  },
  {
    text: "🌛",
    answer: "🌜",
    options: ["🌜", "🌛", "🌕", "🌝"]
  },
  {
    text: "👈",
    answer: "👉",
    options: ["👆", "👉", "👇", "👈"]
  },

];
export const analyticalEmojiQuizpuzz2= [
  {
    text: "🔍 Find the odd one out",
    answer: "🔷",
    options: ["🔴", "🔵", "🟢", "🔷"]
  },
  {
    text: "🔍 Find the odd one out",
    answer: "🔵",
    options: ["❤️",  "💚", "🔵","💛",]
  },
  {
    text: "🔍 Find the odd one out",
    answer: "🏈",
    options: ["⚽️",  "⚾️", "🏀","🏈",]
  },
  {
    text: "🔍 Find the odd one out",
    answer: "🗼",
    options: ["🎡",  "🛝", "🎠","🗼",]
  },
  {
    text: "🔍 Find the odd one out",
    answer: "⭐",
    options: ["🎂", "⭐", "🍰","🍫",]
  },
  {
    text: "🔍 Find the odd one out",
    answer: "Db",
    options: ["Aa" ,"Db", "Mm","Ff"]
  },
    {
    text: "🔍 Find the odd one out",
    answer: "✊",
    options: ["👆", "👉", "✊", "👈"]
  },
  {
    text: "🔍 Find the odd one out",
    answer: "🔄",
    options: ["🔄" ,"➡️", "⬆️","⬇️"]
  },
  {
    text: "🔍 Find the symmetric one ",
    answer: "⚖️",
    options: ["📊", "⚖️", "🪨", "🔢"]
  },
  {
    text: "🔍 Find the odd one out",
    answer: "🐟",
    options: ["🐶", "🐱", "🐭", "🐟"]
  },
  {
    text: "🔍 Find the odd one out",
    answer: "🍎",
    options: ["🥕", "🥦", "🍎", "🌽"]
  },
  {
    text: "🔍 Find the odd one out",
    answer: "✈️",
    options: ["🚗", "🚌", "🚲", "✈️"]
  },
  {
    text: "🔍 Find the missing piece : ◓ ",
   answer: "◒",
    options: ["◐", "◒", "◑", "◓"]
  },
  {
    text: "➡️ Find the emoji that completes the sequence :  🌑, 🌓,❓",
    answer: "🌕",
    options: ["🌑", "🌓", "🌗", "🌕"]
  },
  // {
  //   text: "🧩 Find the next term in the series: 🅰️, 🅰️🅱️, 🅰️🅱️🅲️, 🅰️🅱️🅲️🅳️, ❓",
  //   answer: "🅰️🅱️🅲️🅳️🅴️",
  //   options: [
  //     "🅰️🅱️🅲️🅴️🅳️",
  //     "🅰️🅱️🅱️🅲️🅳️",
  //     "🅰️🅱️🅲️🅳️🅴️",
  //     "🅰️🅱️🅲️🅳️🅵️"
  //   ]
  // },
  {
    text: "🧩 Find the next term in the series: 🔺 : 🍰, 🟥 : : ❓",
    answer: "🎁",
    options: ["🍕", "🟢", "🎁", "🚪"]
  },
  {
    text: "🧩 Find the next term in the series: ab, abc , abcd , ❓",
    answer: "abcde",
    options: ["ab", "abc", "acd", "abcde"]
  },
  {
    text: "🧩 Find the next term in the series: 0, 5 , 10 , 15, ❓",
    answer: "20",
    options: ["5", "25", "40", "20"]
  },
  {
    text: "🧩 Find the next term in the series: 10, 20 , 30 , 40, ❓",
    answer: "50",
    options: ["50", "25", "40", "20"]
  },
 
];


export const fractionEmojiQuizB = [
  {
    text: "Which emoji shows quarters (4 equal parts)?",
    answer: "⊕",
    options: ["⊘", "⊕", "⊟"]
  },
  {
    text: "Which emoji shows quarters (4 equal parts)?",
    answer: "⊗",
    options: ["⊗","⊘", "⊟"]
  },
  {
    text: "Which emoji shows quarters (4 equal parts)?",
    answer: "⊞",
    options: ["⊟", "⊞", "⊖"]
  },
  {
    text: "Which emoji shows quarters (4 equal parts)?",
    answer: "▤",
    options: ["⊟", "▤", "▦"]
  },
  {
    text: "Which emoji shows quarters (4 equal parts)?",
    answer: "▥",
    options: ["⊟", "▥", "▦"]
  },
  {
    text: "Which emoji shows quarters (4 equal parts)?",
    answer: "🪟",
    options: ["🧱", "🪟", "🟦"]
  },
 
];
export const fractionEmojiQuizA = [
  {
    text: "Which emoji shows half (2 equal parts)?",
    answer: "⊖",
    options: ["⊗", "⊕", "⊖"]
  },
  {
    text: "Which emoji shows half (2 equal parts)?",
    answer: "⊘",
    options: ["⊗","⊘", "⊞"]
  },
  {
    text: "Which emoji shows half (2 equal parts)?",
    answer: "⊟",
    options: ["⊛", "⊜", "⊟"]
  },
  {
    text: "Which emoji shows half (2 equal parts)?",
    answer: "◐",
    options: ["⊛", "⊜", "◐"]
  },
  {
    text: "Which emoji shows half (2 equal parts)?",
    answer: "🌓",
    options: ["🌓", "🌘", "🌒"]
  },
  
  

];
export const fractionEmojiQuizC = [
  {
    text: "Which emoji shows whole ?",
    answer: "⬤",
    options: ["⊗", "⊕", "⬤"]
  },
  {
    text: "Which emoji shows whole ?",
    answer: "▢",
    options: ["⊞", "▤", "▢"]
  },
  {
    text: "Which emoji shows whole ?",
    answer: "⬤",
    options: ["◐", "◕", "⬤"]
  },
  {
    text: "Which emoji shows whole ?",
    answer: "🟡",
    options: ["❇️", "🌓", "🟡"]
  },
  {
    text: "Which emoji shows whole ?",
    answer: "⬜",
    options: ["⬜", "🪟", "❇️"]
  },

 
];


export const fractionQuestionBank = [
  {
    text: "🍭 🍭 🍭 🍭 | 🍭 🍭 🍭 🍭",
    options: ["1/2", "1/3", "1/4", "2/3"],
    answer: "1/2"
  },
  {
    text: "🐤 🐤 |  🐤 🐤  |  🐤 🐤   | 🐤 🐤 |  🐤 🐤 |  🐤 🐤  |  🐤 🐤   | 🐤 🐤",
    options: ["3/8", "8/1", "1/8", "2/8"],
    answer: "1/8"
  },
  {
    text: "🍕 🍕 🍕 | 🍕 🍕 🍕  |  🍕 🍕 🍕 | 🍕 🍕 🍕  |  🍕 🍕 🍕",
    options: ["1/3", "1/5", "2/3", "5/3"],
    answer: "1/5"
  },
  {
    text: "🧸 🧸  |  🧸 🧸 | 🧸 🧸",
    options: ["1/2", "2/3", "1/3", "3/4"],
    answer: "1/3"
  },
  {
    text: "🚀 🚀 🚀 | 🚀 🚀 🚀  |  🚀 🚀 🚀  |  🚀 🚀 🚀 |  🚀 🚀 🚀  |  🚀 🚀 🚀",
    options: ["2/6", "2/4", "6/3", "1/6"],
    answer: "1/6"
  },
  {
    text: "🦀 🦀 🦀 🦀 | 🦀 🦀 🦀 🦀",
    options: ["1/2", "1/3", "1/4", "2/3"],
    answer: "1/2"
  },
  {
    text: "⭐ ⭐ |  ⭐ ⭐  |  ⭐ ⭐   | ⭐ ⭐",
    options: ["1/2", "1/4", "3/4", "2/4"],
    answer: "1/4"
  },
  {
    text: "🐙 🐙 🐙 | 🐙 🐙 🐙  |  🐙 🐙 🐙",
    options: ["1/3", "1/2", "2/3", "3/3"],
    answer: "1/3"
  },
  {
    text: "🍎 🍎  |  🍎 🍎 | 🍎 🍎",
    options: ["1/2", "2/3", "1/3", "3/4"],
    answer: "1/3"
  },
  {
    text: "🐟 🐟 🐟 | 🐟 🐟 🐟  |  🐟 🐟 🐟  |  🐟 🐟 🐟",
    options: ["1/4", "2/4", "4/3", "3/4"],
    answer: "1/4"
  }
];

// fractionQuestions.js
export const fractionQuestionBank2 = [
  {
    text: "What is 1/3 of 24?",
    answer: "8",
    options: ["6", "8", "12", "18"]
  },
  {
    text: "What is 1/2 of 98?",
    answer: "49",
    options: ["48", "49", "50", "56"]
  },
  {
    text: "What is 1/4 of 40?",
    answer: "10",
    options: ["8", "10", "12", "14"]
  },
  {
    text: "What is 1/2 of 36?",
    answer: "18",
    options: ["16", "18", "20", "22"]
  },
  {
    text: "What is 1/3 of 45?",
    answer: "15",
    options: ["12", "15", "18", "20"]
  },
  {
    text: "What is 1/3 of 51?",
    answer: "17",
    options: ["15", "16", "17", "18"]
  },
  {
    text: "What is 1/4 of 44?",
    answer: "11",
    options: ["10", "11", "12", "14"]
  },
  {
    text: "What is 1/2 of 26?",
    answer: "13",
    options: ["12", "13", "14", "15"]
  },
  {
    text: "What is 1/4 of 60?",
    answer: "15",
    options: ["14", "15", "16", "18"]
  },
  {
    text: "What is 1/3 of 63?",
    answer: "21",
    options: ["18", "20", "21", "24"]
  }
];


export const fractionQuestionBank3 = [
  {
    text: "There are 18 bananas in a basket. One-third of them are ripe. How many bananas are ripe?",
    answer: "6",
    options: ["3", "6", "9", "12"]
  },
  {
    text: "Yogesh has 15 pencils. 5 are blue and 6 are green. What fraction of the pencils are green?",
    answer: "6/15",
    options: ["5/15", "6/15", "6/10", "9/15"]
  },
  {
    text: "Rajiv has 3 one-seventh parts of a circle. How many more one-seventh parts are needed to make a complete circle?",
    answer: "4",
    options: ["3", "4", "5", "7"]
  },
  {
    text: "A teacher gave 8 halves of chart papers and 16 quarters of marble papers. How many whole papers did she give?",
    answer: "8",
    options: ["4", "6", "8", "12"]
  },
  {
    text: "Raghav had 9 bananas. He ate 5 bananas. What fraction of the bananas did he eat?",
    answer: "5/9",
    options: ["4/9", "5/9", "1/9", "9/5"]
  },
  {
    text: "Sara divides a cake into 5 equal parts. She eats one part and gives 2 parts to her sister. What fraction of the cake is left?",
    answer: "2/5",
    options: ["1/5", "2/5", "3/5", "4/5"]
  },
  {
    text: "Out of 42 chocolates, one-seventh are distributed among students. Find the number of chocolates distributed.",
    answer: "6",
    options: ["7", "6", "14", "21"]
  },
  {
    text: "Sheela has 14 books. 5 are science books and 6 are math books. What fraction of the books are science books?",
    answer: "5/14",
    options: ["6/14", "5/14", "9/14", "1/14"]
  },
  {
    text: "Sonal bought 7 pencils. She gave 3 to her brother. What fraction of pencils are left with Sonal?",
    answer: "4/7",
    options: ["3/7", "4/7", "7/4", "1/7"]
  }
];

// Shuffle helper
const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);


const genQ =(req,res,a)=>{
    const selected = shuffleArray([...a]).slice(0, 5);

  const questions = selected.map((q, index) => {
    const id = uuidv4();

    // store correct answer server-side
    questionsStore[id] = {
      answer: q.answer
    };

    return {
      id,
      step: index + 1,
      question: q.text,        // emoji-based question
      options: shuffleArray([...q.options])
    };
  });

  res.json({
    totalSteps: questions.length,
    questions
  });
}
export const generateFractionQuizk = (req, res) => {
genQ(req,res,fractionEmojiQuizA)
};
export const generateFractionQuizk2= (req, res) => {
genQ(req,res,fractionEmojiQuizB)
};
export const generateFractionQuizk3 = (req, res) => {
genQ(req,res,fractionEmojiQuizC)
};
export const generateFractionQuiz = (req, res) => {
genQ(req,res,fractionQuestionBank)
};
export const generateFractionQuiz2= (req, res) => {
genQ(req,res,fractionQuestionBank2)
};
export const generateFractionQuiz3 = (req, res) => {
genQ(req,res,fractionQuestionBank3)
};
export const generateFractionQuizPuzz3 = (req, res) => {
genQ(req,res,analyticalEmojiQuizpuzz3)
};
export const generateFractionQuizPuzz2 = (req, res) => {
genQ(req,res,analyticalEmojiQuizpuzz2)
};



export async function checkAnswerFraction(req, res) {
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

    if (q.answer === original.answer) {
      score++;
    }

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
