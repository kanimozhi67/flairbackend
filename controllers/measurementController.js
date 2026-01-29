import { v4 as uuidv4 } from "uuid";
import Quiz from "../models/Quiz.js";
const questionsStore = {};

// Generate a single unit conversion question
const generateUnitQuestion = async() => {
  const conversions = [
    { q: "9 m = ____ cm", a: "900 cm" },
    { q: "68 m 75 cm = ____ cm", a: "6875 cm" },
    { q: "745 m 12 cm = ____ cm", a: "74512 cm" },
    { q: "8 m 3 cm = ____ cm", a: "803 cm" },
    { q: "1 m = ____ cm", a: "100 cm" },
    { q: "155 cm = ____ m", a: "1.55 m" },
    { q: "1109 cm = ___ m ___ cm", a: "11 m 9 cm" },
    { q: "6001 cm = ___ m ___ cm", a: "60 m 1 cm" },
    { q: "210 cm = ___ m ___ cm", a: "2 m 10 cm" },
    { q: "306 cm = ___ m ___ cm", a: "3 m 6 cm" },
    { q: "1355 m = ___ km ___ m", a: "1 km 355 m" },
    { q: "3508 m = ___ km ___ m", a: "3 km 508 m" },
    { q: "8270 m = ___ km ___ m", a: "8 km 270 m" },
    { q: "5 km 378 m = ____ m", a: "5378 m" },
    { q: "62 km 29 m = ____ m", a: "62029 m" },
    { q: "1 km = ____ m", a: "1000 m" },
    { q: "4 L 160 mL = ____ mL", a: "4160 mL" },
    { q: "9 L 2 mL = ____ mL", a: "9002 mL" },
    { q: "1 L = ____ mL", a: "1000 mL" },
    { q: "3985 mL = ___ L ___ mL", a: "3 L 985 mL" }
  ];

  const selected = conversions[Math.floor(Math.random() * conversions.length)];
  const id = uuidv4();

  //questionsStore[id] = selected.a;
  await Quiz.create({
      id,
     
      answerString:selected.a,
      createdAt: new Date(),
    });
  return { id, question: selected.q };
};

// Generate 6 questions only
export const genUnitQuiz = async(req, res) => {
  const COUNT = 6;
  // const questions = Array.from({ length: COUNT }, generateUnitQuestion);
    const questions = await Promise.all(
    Array.from({ length: COUNT }, () => generateUnitQuestion())
  );
  res.json({ questions });
};

// ----------------------
// Answer Checking Utils
// ----------------------

// Remove spaces and lowercase
const normalize = (val) =>
  val.toLowerCase().replace(/\s+/g, "");

// Parse mixed meters + cm or decimal meters
const parseMeters = (val) => {
  val = val.toLowerCase().replace(/\s+/g, "");
  const regex = /(?:(\d+)m)?(?:(\d+)cm)?/i;
  const match = val.match(regex);

  if (match && (match[1] || match[2])) {
    const meters = parseInt(match[1] || 0, 10);
    const cm = parseInt(match[2] || 0, 10);
    return meters + cm / 100;
  }

  const num = parseFloat(val.replace(/[^\d.]/g, ""));
  return isNaN(num) ? 0 : num;
};

// Parse mixed liters + mL or decimal liters
const parseLiters = (val) => {
  val = val.toLowerCase().replace(/\s+/g, "");
  const regex = /(?:(\d+)l)?(?:(\d+)ml)?/i;
  const match = val.match(regex);

  if (match && (match[1] || match[2])) {
    const liters = parseInt(match[1] || 0, 10);
    const mL = parseInt(match[2] || 0, 10);
    return liters + mL / 1000;
  }

  const num = parseFloat(val.replace(/[^\d.]/g, ""));
  return isNaN(num) ? 0 : num;
};

// Check answers
export const checkUnitAnswers = async(req, res) => {
  const { answers } = req.body;
  let score = 0;
  const results = [];

  for (const q of answers) {
    // const correct = questionsStore[q.id];
      const correct = await Quiz.findOne({ id: q.id });
    if (!correct) continue;

    let isCorrect = false;

    // If correct answer is decimal meters (e.g., 0.55 m, 1.55 m)
    if (/m/.test(correct.answerString) && /\d+\.\d+/.test(correct.answerString)) {
      isCorrect = parseMeters(q.answer) === parseMeters(correct.answerString);
    }
    // If correct answer is mixed meters + cm (e.g., 1 m 55 cm)
    else if (/cm/.test(correct.answerString) && /m/.test(correct.answerString)) {
      isCorrect = parseMeters(q.answer) === parseMeters(correct.answerString);
    }
    // If correct answer is liters/mL
    else if (/l/i.test(correct.answerString) && /ml/i.test(correct.answerString)) {
      isCorrect = parseLiters(q.answer) === parseLiters(correct.answerString);
    }
    // Default comparison
    else {
      isCorrect = normalize(q.answer) === normalize(correct.answerString);
    }

    if (isCorrect) score++;

    results.push({
      id: q.id,
      userAnswer: q.answer,
      correctAnswer: correct.answerString,
      isCorrect
    });

     await Quiz.deleteOne({ id: q.id });
  }

  res.json({
    score,
    total: answers.length,
    results
  });
};


// ----------------------
// Question Bank
// ----------------------

const ADDITION_QUESTIONS = [
  {
    q: "14 m 55 cm + 28 m 8 cm + 31 m 75 cm = ____",
    a: "74 m 38 cm"
  },
  {
    q: "18 kg 15 g + 25 kg 258 g + 34 kg 820 g = ____",
    a: "78 kg 93 g"
  },
  {
    q: "9 kg 20 g + 5 kg 5 g + 6 kg 3 g = ____",
    a: "20 kg 28 g"
  },
  {
    q: "25 L 190 mL + 60 L 35 mL + 6 L 4 mL = ____",
    a: "91 L 229 mL"
  },
  {
    q: "3 m 2 cm + 9 m 6 cm + 5 m 2 cm = ____",
    a: "17 m 10 cm"
  }
];

const SUBTRACTION_QUESTIONS = [
  {
    q: "25 m 56 cm − 8 m 98 cm = ____",
    a: "16 m 58 cm"
  },
  {
    q: "56 m 9 cm − 27 m 18 cm = ____",
    a: "28 m 91 cm"
  },
  {
    q: "25 L 108 mL − 15 L 23 mL = ____",
    a: "10 L 85 mL"
  },
  {
    q: "45 kg 29 g − 37 kg 8 g = ____",
    a: "8 kg 21 g"
  },
  {
    q: "96 kg 506 g − 40 kg 50 g = ____",
    a: "56 kg 456 g"
  }
];

// ----------------------
// Generate Quiz
// ----------------------

export const genAvgQuiz = (req, res) => {
  // mode = "add" | "sub"
  const mode = req.query.mode === "sub" ? "sub" : "add";

  const source =
    mode === "sub" ? SUBTRACTION_QUESTIONS : ADDITION_QUESTIONS;

  const questions = source.map(item => {
    const id = uuidv4();

//questionsStore[id] = item.a;

   Quiz.create({
      id,
   
      answerString:item.a,
      createdAt: new Date(),
    });

    return { id, question: item.q };
  });

  res.json({
    mode,
    count: 5,
    questions
  });
};

// ----------------------
// Answer Checking
// ----------------------

const normalize2 = (val) =>
  val
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9.]/g, "");

export const checkAvgAnswers = async(req, res) => {
  const { answers } = req.body;

  let score = 0;
  const results = [];

  for (const q of answers) {

 const correct = await Quiz.findOne({ id: q.id });
    //const correct = questionsStore[q.id];
    if (!correct) continue;

    const isCorrect =
      normalize2(q.answer) === normalize2(correct.answerString);

    if (isCorrect) score++;

    results.push({
      id: q.id,
      userAnswer: q.answer,
      correctAnswer: correct.answerString,
      isCorrect
    });
  await Quiz.deleteOne({ id: q.id });
    //delete questionsStore[q.id];
  }

  res.json({
    score,
    total: answers.length,
    results
  });
};

// Question Bank (8 total)
// ----------------------

const WORD_PROBLEMS = [
  {
    q: "A pole measures 15 m. A part of length 1 m 50 cm is put into the ground. What is the length of the pole above the ground?",
    a: "13 m 50 cm"
  },
  {
    q: "Raju has to paint a pipe 30 m 45 cm long. He painted 11 m 25 cm in one week. How much does he have to paint now?",
    a: "19 m 20 cm"
  },
  {
    q: "An electrician bought 5 m 20 cm yellow wire, 3 m 20 cm red wire and 7 m 20 cm black wire. Find the total length of wire bought.",
    a: "15 m 60 cm"
  },
  {
    q: "A farmer reaped 325 kg of wheat in 2018 and 254 kg in 2019. By how much did the crop production reduce in 2019?",
    a: "71 kg"
  },
  {
    q: "A shopkeeper had 750 kg of dry fruits. He sold 65 kg to one customer and 380 kg to another. Find the mass of dry fruits still left.",
    a: "305 kg"
  },
  {
    q: "Ramola got her car tank full on Sunday with 40 L of petrol. The car consumed 24 L 385 mL on Monday. How much petrol is still left in the tank?",
    a: "15 L 615 mL"
  },
  {
    q: "A family consumes 30 L 750 mL of vegetable oil and cooking oil in a month. The consumption of vegetable oil is 12 L 255 mL. What is the consumption of cooking oil?",
    a: "18 L 495 mL"
  },
  {
    q: "A barrel has 69 L 995 mL of oil. 89 L 975 mL of oil is poured into the barrel. What is the capacity of oil in the barrel now?",
    a: "159 L 970 mL"
  }
];
export const genWordQuiz = (req, res) => {
  // Shuffle & pick 5
  const shuffled = [...WORD_PROBLEMS].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 5);

  const questions = selected.map(item => {
    const id = uuidv4();
    // questionsStore[id] = item.a;

    
   Quiz.create({
      id,
   
      answerString:item.a,
      createdAt: new Date(),
    });

    return {
      id,
      question: item.q
    };
  });

  res.json({
    count: 5,
    questions
  });
};
const normalize3 = (val) =>
  val
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9.]/g, "");

export const checkWordAnswers = async(req, res) => {
  const { answers } = req.body;

  let score = 0;
  const results = [];

  for (const q of answers) {
     const correct = await Quiz.findOne({ id: q.id });
    // const correct = questionsStore[q.id];
    if (!correct) continue;

    const isCorrect =
      normalize3(q.answer) === normalize3(correct.answerString);

    if (isCorrect) score++;

    results.push({
      id: q.id,
      userAnswer: q.answer,
      correctAnswer: correct.answerString,
      isCorrect
    });
    await Quiz.deleteOne({ id: q.id });
    // delete questionsStore[q.id];
  }

  res.json({
    score,
    total: answers.length,
    results
  });
};

