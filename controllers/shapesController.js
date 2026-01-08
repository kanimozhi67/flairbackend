// Stores generated questions per session
const shapeQuestionsStore = {}; // { [id]: { correctAnswer, emoji, options } }
const shapes2Dc = [
  { name: "0", emoji: "⭕" },
  { name: "3", emoji: "🔺" },
  { name: "3", emoji: "📐" },
  { name: "4", emoji: "▭" },
  { name: "4", emoji: "🖼️" },
  { name: "4", emoji: "♦️" },
  { name: "0", emoji: "🥚" },
];

const shapes3Dc = [
  { name: "12", emoji: "🎲" },
  { name: "12", emoji: "🧊" },
  { name: "12", emoji: "📦" },
  { name: "12", emoji: "📺" },
  { name: "1", emoji: "🏀" }, // approximate
  { name: "1", emoji: "⚽" }, // approximate
  { name: "2", emoji: "🥫" },
  { name: "2", emoji: "🛢️" },
  { name: "2", emoji: "✏️" },
  { name: "1", emoji: "🎉" },
  { name: "8", emoji: "⛺" },
];

const shapes2D = [
  { name: "Circle", emoji: "⭕" },
  { name: "Circle", emoji: "💍" },
  { name: "Triangle", emoji: "🔺" },
  { name: "Triangle", emoji: "📐" },
  { name: "Rectangle", emoji: "▭" },
  { name: "Square", emoji: "🖼️" },
  { name: "Star", emoji: "⭐" },
  { name: "Heart", emoji: "❤️" },
  { name: "Diamond", emoji: "♦️" },
  { name: "Diamond", emoji: "💎" },
  { name: "Oval", emoji: "🥚" },
  { name: "Pentagon", emoji: "⬟" },
  { name: "Hexaagon", emoji: "⬡" },
];

const shapes3D = [
  { name: "Cube", emoji: "🎲" },
  { name: "Cube", emoji: "🧊" },
  { name: "Cube", emoji: "📦" },
  { name: "Cuboid", emoji: "📺" },
  { name: "Sphere", emoji: "🏀" }, // approximate
  { name: "Sphere", emoji: "⚽" }, // approximate
  { name: "Cylinder", emoji: "🥫" },
  { name: "Cylinder", emoji: "🛢️" },
  { name: "Cylinder", emoji: "✏️" },
  { name: "Cone", emoji: "🎉" },
  { name: "Pyramid", emoji: "⛺" },
];

// export function generateShapeQuizStep(req, res) {
//   const questions = [];

//   for (let i = 0; i < 5; i++) {
//     // Pick a random shape
//     const correctIndex = Math.floor(Math.random() * shapes.length);
//     const correctShape = shapes[correctIndex];

//     // Create options array: 1 correct + 2 random wrong
//     const optionsSet = new Set([correctShape.name]);
//     while (optionsSet.size < 3) {
//       const randShape = shapes[Math.floor(Math.random() * shapes.length)].name;
//       optionsSet.add(randShape);
//     }

//     const options = Array.from(optionsSet).sort(() => Math.random() - 0.5); // shuffle

//     const id = Date.now() + i;

//     // Store the correct answer in memory
//     shapeQuestionsStore[id] = {
//       correctAnswer: correctShape.name,
//       emoji: correctShape.emoji,
//       options,
//     };

//     // Send only the question to frontend (step-by-step)
//     questions.push({
//       id,
//       emoji: correctShape.emoji,
//       options,
//     });
//   }

//   // Send questions array
//   res.json({ questions });
// }
export function generateShapeQuizStep(req, res) {
  shapeq(req,res, shapes3D,shapes2D);
}
export function generateShapeQuizStep2(req, res) {
  shapeq(req,res, shapes2Dc,shapes2Dc);
}
export function generateShapeQuizStep3(req, res) {
  shapeq(req,res, shapes3Dc,shapes3Dc);
}

const shapeq=(req,res,a,b)=>{
  const questions = [];

  for (let i = 0; i < 5; i++) {
    // Randomly choose 2D or 3D shape
    const is3D = Math.random() < 0.5;
    const shapeArray = is3D ? a : b;

    // Pick a random shape
    const correctIndex = Math.floor(Math.random() * shapeArray.length);
    const correctShape = shapeArray[correctIndex];

    // Generate options: correct + 2 random
    const optionsSet = new Set([correctShape.name]);
    while (optionsSet.size < 3) {
      const randShape = b.concat(a)[Math.floor(Math.random() * (b.length + a.length))].name;
      optionsSet.add(randShape);
    }

    const options = Array.from(optionsSet).sort(() => Math.random() - 0.5); // shuffle

    const id = Date.now() + i;

    // Store correct answer in memory
    shapeQuestionsStore[id] = {
      correctAnswer: correctShape.name,
      emoji: correctShape.emoji,
      options,
    };

    questions.push({
      id,
      emoji: correctShape.emoji,
      options,
    });
  }

  res.json({ questions });
}

// export async function checkShapeAnswerStep(req, res) {
//   const { userId, answer } = req.body;
//   // answer = { id, selectedOption }

//   if (!answer || !answer.id || !answer.selectedOption) {
//     return res.status(400).json({ error: "Invalid answer format." });
//   }

//   const original = shapeQuestionsStore[answer.id];
//   if (!original) {
//     return res.status(404).json({ error: "Question not found." });
//   }

//   const isCorrect = answer.selectedOption === original.correctAnswer;

//   // Optional: Save user progress if you have a UserProgress model
//   let score = isCorrect ? 1 : 0;
//   if (userId) {
//     try {
//       // await UserProgress.create({ user: userId, score, date: new Date() });
//     } catch (err) {
//       console.error("Error saving progress:", err);
//     }
//   }

//   // Remove question after answering
//   delete shapeQuestionsStore[answer.id];

//   res.json({
//     id: answer.id,
//     emoji: original.emoji,
//     correctAnswer: original.correctAnswer,
//     userAnswer: answer.selectedOption,
//     isCorrect,
//     score,
//   });
// }
export async function checkShapeAnswerStep(req, res) {
  const { userId, answer } = req.body;
  // answer = { id, selectedOption }

  if (!answer || !answer.id || !answer.selectedOption) {
    return res.status(400).json({ error: "Invalid answer format." });
  }

  const original = shapeQuestionsStore[answer.id];
  if (!original) {
    return res.status(404).json({ error: "Question not found." });
  }

  const isCorrect = answer.selectedOption === original.correctAnswer;

  // Optional: save progress if you have UserProgress model
  let score = isCorrect ? 1 : 0;
  if (userId) {
    try {
      // await UserProgress.create({ user: userId, score, date: new Date() });
    } catch (err) {
      console.error("Error saving progress:", err);
    }
  }

  delete shapeQuestionsStore[answer.id];

  res.json({
    id: answer.id,
    emoji: original.emoji,
    correctAnswer: original.correctAnswer,
    userAnswer: answer.selectedOption,
    isCorrect,
    score,
  });
}
