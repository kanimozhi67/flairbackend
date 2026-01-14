// fractionQuestions.js
// fractionQuizController.js
import { v4 as uuidv4 } from "uuid";

import UserProgress from "../models/UserProgress.js";


export const logicpuzz3=
[
  {
    text: " 🧩 8 = 88, 🧩 7 = 70,🧩 6 = 54, 🧩 4 = 28, 🧩 2 = ?",
    options: ["12", "14", "16"],
    answer: "12"
  },
  {
    text: " 🧩 5 = 30, 🧩 4 = 20, 🧩 3 = 12, 🧩 2 = ?",
    options: ["6", "8", "10"],
    answer: "8"
  },
  {
    text: " 🧩 9 = 90, 🧩 8 = 72, 🧩 7 = 56, 🧩 6 = ?",
    options: ["36", "40", "42"],
    answer: "42"
  },
  {
    text: "🧩 6 = 42, 🧩 5 = 30, 🧩 4 = 20, 🧩 3 = ?",
    options: ["10", "12", "15"],
    answer: "12"
  },
  {
    text: " 🧩 10 = 110, 🧩 9 = 99, 🧩 8 = 88, 🧩 7 = ?",
    options: ["70", "77", "84"],
    answer: "77"
  },
  {
    text: " 🧩 4 = 16, 🧩 5 = 25, 🧩 6 = 36, 🧩 7 = ?",
    options: ["42", "48", "49"],
    answer: "49"
  },
  {
    text: " 🧩 3 = 6, 🧩 4 = 12, 🧩 5 = 20, 🧩 6 = ?",
    options: ["24", "30", "36"],
    answer: "30"
  },
  {
    text: " 🧩 2 = 6, 🧩 3 = 12, 🧩 4 = 20, 🧩 5 = ?",
    options: ["25", "30", "35"],
    answer: "30"
  },
  {
    text: " 🧩 7 = 56, 🧩 6 = 42, 🧩 5 = 30, 🧩 4 = ?",
    options: ["16", "20", "24"],
    answer: "20"
  },
  {
    text: " 🧩 9 = 81, 🧩 8 = 64, 🧩 7 = 49, 🧩 6 = ?",
    options: ["30", "36", "42"],
    answer: "36"
  },
  {
    text: " 🧩 1 = 1, 🧩 2 = 4, 🧩 3 = 9, 🧩 4 = ?",
    options: ["12", "14", "16"],
    answer: "16"
  },
  {
    text: " 🧩 2 = 10, 🧩 3 = 15, 🧩 4 = 20, 🧩 5 = ?",
    options: ["25", "30", "35"],
    answer: "25"
  },
  {
    text: " 🧩 6 = 36, 🧩 5 = 25, 🧩 4 = 16, 🧩 3 = ?",
    options: ["6", "9", "12"],
    answer: "9"
  },
  {
    text: "🧩 8 = 64, 🧩 6 = 36, 🧩 4 = 16, 🧩 2 = ?",
    options: ["2", "4", "8"],
    answer: "4"
  },
  {
    text: "🧩 3 = 15, 🧩 4 = 24, 🧩 5 = 35, 🧩 6 = ?",
    options: ["42", "48", "54"],
    answer: "48"
  },
  {
    text: "🧩 11 = 121, 🧩 10 = 100, 🧩 9 = 81, 🧩 8 = ?",
    options: ["60", "64", "72"],
    answer: "64"
  },
  {
    text: "🧩 4 = 28, 🧩 5 = 40, 🧩 6 = 54, 🧩 7 = ?",
    options: ["70", "84", "98"],
    answer: "70"
  },
  {
    text: "🧩 1 = 2, 🧩 2 = 6, 🧩 3 = 12, 🧩 4 = ?",
    options: ["16", "18", "20"],
    answer: "20"
  },
  {
    text: " 🧩 5 = 55, 🧩 4 = 44, 🧩 3 = 33, 🧩 2 = ?",
    options: ["11", "20", "22"],
    answer: "22"
  },
  {
    text: " 🧩 6 = 48, 🧩 5 = 40, 🧩 4 = 32, 🧩 3 = ?",
    options: ["18", "24", "28"],
    answer: "24"
  },
  {
    text: "🧩 7 = 49, 🧩 6 = 36, 🧩 5 = 25, 🧩 4 = ?",
    options: ["14", "16", "20"],
    answer: "16"
  },
  {
    text: " 🧩 9 = 108, 🧩 8 = 96, 🧩 7 = 84, 🧩 6 = ?",
    options: ["66", "72", "78"],
    answer: "72"
  },
  {
    text: "🧩 3 = 27, 🧩 2 = 8, 🧩 1 = 1, 🧩 0 = ?",
    options: ["0", "1", "2"],
    answer: "0"
  },
  {
    text: "🧩 10 = 20, 🧩 9 = 18, 🧩 8 = 16, 🧩 7 = ?",
    options: ["12", "14", "15"],
    answer: "14"
  },
  {
    text: "🧩 4 = 12, 🧩 6 = 30, 🧩 8 = 56, 🧩 10 = ?",
    options: ["80", "90", "110"],
    answer: "90"
  },
  {
    text: "🧩 1 = 3, 2 = 8, 3 = 15, 4 = ?",
    options: ["20", "24", "25"],
    answer: "24"
  },
  {
    text: "🧩 5 = 15, 🧩 6 = 21, 🧩 7 = 28, 🧩 8 = ?",
    options: ["32", "36", "40"],
    answer: "36"
  },
  {
    text: "🧩 12 = 144, 11 = 121, 10 = 100, 9 = ?",
    options: ["72", "81", "90"],
    answer: "81"
  },
  {
    text: "🧩 3 = 9, 🧩 6 = 36, 🧩 9 = 81, 🧩 12 = ?",
    options: ["144", "121", "108"],
    answer: "144"
  },
  {
    text: "🧩 2 = 4, 🧩 4 = 16, 🧩 6 = 36, 🧩 8 = ?",
    options: ["48", "64", "72"],
    answer: "64"
  },
  {
    text: "🧩 1 = 5, 🧩 2 = 10, 🧩 3 = 15, 🧩 4 = ?",
    options: ["18", "20", "25"],
    answer: "20"
  },
  {
    text: "🧩 6 = 66, 🧩 5 = 55, 🧩 4 = 44, 🧩 3 = ?",
    options: ["22", "30", "33"],
    answer: "33"
  }
]

export const logicpuzz2=

[
  {
    text: "Find the missing numbers: 1, 4, 9, 16, __",
    options: ["25, 36", "20, 30", "24, 35"],
    answer: "25, 36"
  },
  {
    text: "Find the missing number: 1, 3, 6, 10, __",
    options: ["14", "15", "16"],
    answer: "15"
  },
  {
    text: "Find the missing number: 2, 4, 8, 16, __",
    options: ["24", "30", "32"],
    answer: "32"
  },
  {
    text: "Find the missing number: 5, 10, 15, __, 25",
    options: ["18", "20", "22"],
    answer: "20"
  },
  {
    text: "Find the missing numbers: 1, 1, 2, 3, __, __",
    options: ["5, 8", "4, 7", "6, 9"],
    answer: "5, 8"
  },
  {
    text: "Find the missing number: 2, 6, 12, 20, __",
    options: ["28", "30", "32"],
    answer: "30"
  },
  {
    text: "Find the missing number: 3, 6, 9, 12, __",
    options: ["14", "15", "18"],
    answer: "15"
  },
  {
    text: "Find the missing number: 1, 2, 4, 8, __",
    options: ["12", "14", "16"],
    answer: "16"
  },
  {
    text: "Find the missing number: 10, 20, 30, __, 50",
    options: ["35", "40", "45"],
    answer: "40"
  },
  {
    text: "Find the missing numbers: 1, 4, 7, __, __",
    options: ["10, 13", "9, 12", "11, 14"],
    answer: "10, 13"
  },
  {
    text: "Find the missing number: 2, 3, 5, 8, __",
    options: ["11", "12", "13"],
    answer: "13"
  },
  {
    text: "Find the missing number: 100, 90, 80, __",
    options: ["60", "70", "75"],
    answer: "70"
  },
  {
    text: "Find the missing number: 1, 5, 25, __",
    options: ["50", "100", "125"],
    answer: "125"
  },
  {
    text: "Find the missing number: 7, 14, 21, __",
    options: ["24", "28", "30"],
    answer: "28"
  },
  {
    text: "Find the missing numbers: 2, 5, 10, __, __",
    options: ["17, 26", "15, 20", "17, 28"],
    answer: "17, 26"
  },
  {
    text: "Find the missing number: 1, 4, 9, __, 25",
    options: ["14", "15", "16"],
    answer: "16"
  },
  {
    text: "Find the missing number: 4, 8, 16, __",
    options: ["24", "30", "32"],
    answer: "32"
  },
  {
    text: "Find the missing number: 9, 18, 27, __",
    options: ["36", "40", "45"],
    answer: "36"
  },
  {
    text: "Find the missing numbers: 1, 2, 6, __, __",
    options: ["12, 20", "12, 24", "10, 20"],
    answer: "12, 24"
  },
  {
    text: "Find the missing number: 11, 22, 33, __",
    options: ["40", "44", "55"],
    answer: "44"
  },
  {
    text: "Find the missing number: 2, 4, 6, 8, __",
    options: ["9", "10", "12"],
    answer: "10"
  },
  {
    text: "Find the missing number: 1, 3, 9, __",
    options: ["18", "27", "81"],
    answer: "27"
  },
  {
    text: "Find the missing number: 6, 12, 18, __",
    options: ["20", "24", "30"],
    answer: "24"
  },
  {
    text: "Find the missing number: 5, 15, 45, __",
    options: ["90", "135", "180"],
    answer: "135"
  },
  {
    text: "Find the missing numbers: 1, 8, 27, __, __",
    options: ["64, 125", "36, 49", "81, 216"],
    answer: "64, 125"
  }
]


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
export const logicQuizPuzz2 = (req, res) => {
genQ(req,res,logicpuzz2)
};
export const logicQuizPuzz3 = (req, res) => {
genQ(req,res,logicpuzz3)
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
