// fractionQuestions.js
// fractionQuizController.js
import { v4 as uuidv4 } from "uuid";

import UserProgress from "../models/UserProgress.js";

export const puzz2=
[
  {
    text: "I add six to eleven and get five. How is this correct?",
    answer: "It is on a clock",
    options: ["Using a clock", "Using a calculator", "Using Roman numbers", "Using fractions"]
  },
  {
    text: "Three animals are weighed in pairs. Elephant + 2 Crocodiles = 1200 kg, Crocodile + 4 Monkeys = 400 kg, Elephant + 4 Monkeys = 1000 kg. What is the elephant's weight?",
    answer: "800 kg",
    options: ["600 kg", "700 kg", "800 kg", "900 kg"]
  },
  {
    text: "What comes once in a minute, twice in a moment, but never in a thousand years?",
    answer: "The letter M",
    options: ["The letter M", "Time", "Seconds", "The letter O"]
  },
  {
    text: "If you have me, you want to share me. If you share me, you no longer have me. What am I?",
    answer: "A secret",
    options: ["Money", "A secret", "A gift", "A promise"]
  },
  {
    text: "What has hands but cannot clap?",
    answer: "A clock",
    options: ["A monkey", "A doll", "A clock", "A robot"]
  },
  {
    text: "What has a neck but no head, two arms but no hands?",
    answer: "A shirt",
    options: ["A robot", "A tree", "A shirt", "A jacket"]
  },
  {
    text: "What can travel around the world while staying in one place?",
    answer: "A stamp",
    options: ["An airplane", "A stamp", "The moon", "A map"]
  },
  {
    text: "The more you take, the more you leave behind. What are they?",
    answer: "Footsteps",
    options: ["Memories", "Footsteps", "Money", "Time"]
  },
  {
    text: "What gets wetter the more it dries?",
    answer: "A towel",
    options: ["Rain", "Water", "A towel", "Soap"]
  },
  {
    text: "What has one eye but cannot see?",
    answer: "A needle",
    options: ["A storm", "A needle", "A camera", "A fish"]
  },
  {
    text: "What goes up but never comes down?",
    answer: "Your age",
    options: ["Smoke", "A balloon", "Your age", "A rocket"]
  },
  {
    text: "Which weighs more: a kilogram of cotton or a kilogram of iron?",
    answer: "They weigh the same",
    options: ["Cotton", "Iron", "They weigh the same", "Depends on size"]
  },

  {
    text: "What has keys but cannot open locks?",
    answer: "A piano",
    options: ["A map", "A piano", "A door", "A keyboard"]
  },
  {
    text: "If there are three apples and you take two, how many do you have?",
    answer: "Two",
    options: ["One", "Two", "Three", "Zero"]
  },
  {
    text: "What runs but never walks, has a mouth but never talks?",
    answer: "A river",
    options: ["A dog", "A river", "A train", "A clock"]
  },
  {
    text: "What has many teeth but cannot bite?",
    answer: "A comb",
    options: ["A zipper", "A saw", "A comb", "A snake"]
  },
  {
    text: "What can you catch but not throw?",
    answer: "A cold",
    options: ["A ball", "A cold", "A stick", "A fish"]
  },
  {
    text: "Before Mount Everest was discovered, what was the tallest mountain?",
    answer: "Mount Everest",
    options: ["K2", "Mount Everest", "Kilimanjaro", "Alps"]
  },
  {
    text: "What has an end but no beginning?",
    answer: "A circle",
    options: ["A road", "A story", "A circle", "A rope"]
  },
  {
    text: "What breaks when you say it?",
    answer: "Silence",
    options: ["Glass", "A rule", "Silence", "A promise"]
  },
  {
    text: "How many months have 28 days?",
    answer: "All of them",
    options: ["One", "Two", "Six", "All of them"]
  },
  {
    text: "What has a heart but no organs?",
    answer: "A deck of cards",
    options: ["A robot", "A deck of cards", "A tree", "A book"]
  },
  {
    text: "If you drop me, I crack. If you smile at me, I smile back. What am I?",
    answer: "A mirror",
    options: ["Glass", "A mirror", "Ice", "A plate"]
  },
  {
    text: "What has four wheels and flies?",
    answer: "A garbage truck",
    options: ["An airplane", "A helicopter", "A garbage truck", "A race car"]
  },
  {
    text: "What begins with T, ends with T, and has T in it?",
    answer: "A teapot",
    options: ["A tent", "A teapot", "A ticket", "A tablet"]
  },
  {
    text: "What can fill a room but takes up no space?",
    answer: "Light",
    options: ["Air", "Sound", "Light", "Water"]
  },
  {
    text: "What has a thumb and four fingers but is not alive?",
    answer: "A glove",
    options: ["A robot", "A glove", "A doll", "A hand"]
  },
  {
    text: "What is always in front of you but can’t be seen?",
    answer: "The future",
    options: ["Air", "Your nose", "The future", "Time"]
  },
  {
    text: "What has legs but doesn’t walk?",
    answer: "A table",
    options: ["A chair", "A table", "A bed", "A spider"]
  },
  {
    text: "What kind of band never plays music?",
    answer: "A rubber band",
    options: ["Rock band", "Jazz band", "Rubber band", "Marching band"]
  },
  {
    text: "What has an eye but cannot see, and a mouth but cannot eat?",
    answer: "A needle",
    options: ["A needle", "A snake", "A camera", "A storm"]
  },
  {
    text: "What comes down but never goes up?",
    answer: "Rain",
    options: ["Snow", "Rain", "Sunlight", "Fog"]
  },
  {
    text: "If two is company and three is a crowd, what are four and five?",
    answer: "Nine",
    options: ["Seven", "Nine", "Eleven", "Too many"]
  }
]
export const puzz3=
[
 
  
  {
    text: "If 5x = 45, what is x?",
    answer: "9",
    options: ["7", "8", "9", "10"]
  },
 
  {
    text: "A number plus 18 equals 50. What is the number?",
    answer: "32",
    options: ["28", "30", "32", "34"]
  },
 
  {
    text: "If half of a number is 22, what is the number?",
    answer: "44",
    options: ["40", "42", "44", "46"]
  },

  {
    text: "A number multiplied by 6 gives 72. What is the number?",
    answer: "12",
    options: ["10", "11", "12", "14"]
  },
 
  {
    text: "The sum of two consecutive numbers is 37. What is the smaller number?",
    answer: "18",
    options: ["17", "18", "19", "20"]
  },
   {
    text: "A number reduced by 25 equals 75. What is the number?",
    answer: "100",
    options: ["90", "95", "100", "105"]
  },
 
  {
    text: "If a number is divided by 8, the result is 7. What is the number?",
    answer: "56",
    options: ["48", "52", "56", "60"]
  },
  {
    text: "If 9x = 81, what is x?",
    answer: "9",
    options: ["7", "8", "9", "10"]
  },
 
  {
    text: "The sum of a number and 36 is 90. What is the number?",
    answer: "54",
    options: ["48", "50", "54", "56"]
  },
    {
    text: "If 3 notebooks cost 27 units, how much does 1 notebook cost?",
    answer: "9",
    options: ["7", "8", "9", "10"]
  },

  {
    text: "If a number is multiplied by 4 and becomes 100, what is the number?",
    answer: "25",
    options: ["20", "22", "25", "30"]
  },
  
 {
    text: "If a number is tripled and becomes 45, what is the number?",
    answer: "15",
    options: ["10", "12", "15", "18"]
  },

  {
    text: "The product of two equal numbers is 49. What is one of the numbers?",
    answer: "7",
    options: ["5", "6", "7", "8"]
  },
  {
    text: "If 2x + 6 = 20, what is x?",
    answer: "7",
    options: ["6", "7", "8", "9"]
  },

  {
    text: "A number divided by 3 equals 21. What is the number?",
    answer: "63",
    options: ["54", "60", "63", "66"]
  },
   {
    text: "If a number is doubled and becomes 90, what is the number?",
    answer: "45",
    options: ["40", "42", "45", "48"]
  },

  {
    text: "If 10x = 120, what is x?",
    answer: "12",
    options: ["10", "11", "12", "14"]
  },
   {
    text: "If a number plus 19 equals 67, what is the number?",
    answer: "48",
    options: ["44", "46", "48", "50"]
  },
    {
    text: "The sum of two equal numbers is 64. What is one number?",
    answer: "32",
    options: ["28", "30", "32", "34"]
  },


  {
    text: "If you multiply a number by 3 and add 12, you get 27. What is the number?",
    answer: "5",
    options: ["3", "5", "7", "9"]
  },
  {
    text: "A number increased by 15 gives 42. What is the number?",
    answer: "27",
    options: ["17", "22", "27", "30"]
  },
  {
    text: "What number comes next in the pattern: 2, 6, 12, 20, __?",
    answer: "30",
    options: ["24", "26", "28", "30"]
  },
  {
    text: "If half of a number is 18, what is the number?",
    answer: "36",
    options: ["30", "32", "36", "40"]
  },
 
  {
    text: "A number is doubled and then reduced by 8 to give 20. What is the number?",
    answer: "14",
    options: ["10", "12", "14", "16"]
  },
  {
    text: "What number must be added to 19 to make it three times larger?",
    answer: "38",
    options: ["19", "29", "38", "57"]
  },

  {
    text: "A number divided by 4 gives 9. What is the number?",
    answer: "36",
    options: ["18", "24", "32", "36"]
  },
 
  {
    text: "The sum of two consecutive numbers is 41. What is the smaller number?",
    answer: "20",
    options: ["19", "20", "21", "22"]
  },
  {
    text: "If 3x = 24, what is x?",
    answer: "8",
    options: ["6", "7", "8", "9"]
  },
  {
    text: "What number is 10 more than twice 15?",
    answer: "40",
    options: ["35", "38", "40", "45"]
  },
 
  {
    text: "If a number is divided by 5, the result is 6. What is the number?",
    answer: "30",
    options: ["20", "25", "30", "35"]
  },
 

  {
    text: "The difference between two numbers is 9. If the smaller number is 13, what is the larger number?",
    answer: "22",
    options: ["20", "21", "22", "23"]
  },
  {
    text: "What number when added to itself gives 50?",
    answer: "25",
    options: ["20", "22", "25", "30"]
  },

  {
    text: "If a number is reduced by 12, the result is 20. What is the number?",
    answer: "32",
    options: ["28", "30", "32", "34"]
  },

  {
    text: "If 4 notebooks cost 48 units, how much does 1 notebook cost?",
    answer: "12",
    options: ["8", "10", "12", "14"]
  },
 
  {
    text: "The sum of a number and 14 is 50. What is the number?",
    answer: "36",
    options: ["32", "34", "36", "38"]
  },

  {
    text: "If a number is multiplied by 7, the result is 56. What is the number?",
    answer: "8",
    options: ["6", "7", "8", "9"]
  },
 
]


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
    text: "What is the next number: 4, 9, 16, 25, __?",
    answer: "36",
    options: ["30", "32", "36", "40"]
  },
   {
    text: "Find the missing number: 5, 15, 45, __?",
    answer: "135",
    options: ["90", "120", "135", "150"]
  },
  {
    text: "What comes next: 1, 4, 9, 16, 25, __?",
    answer: "36",
    options: ["30", "32", "36", "40"]
  },
 
  {
    text: "Find the missing number: 7, 14, 28, __?",
    answer: "56",
    options: ["42", "49", "56", "63"]
  },
   {
    text: "What is the next number: 2, 5, 10, 17, __?",
    answer: "26",
    options: ["22", "24", "26", "28"]
  },
    {
    text: "Find the missing number: 100, 95, 90, __?",
    answer: "85",
    options: ["80", "82", "85", "88"]
  },

  {
    text: "What comes next: 6, 12, 18, __?",
    answer: "24",
    options: ["20", "22", "24", "26"]
  },
  {
    text: "Find the missing number: 1, 2, 6, 24, __?",
    answer: "120",
    options: ["100", "110", "120", "130"]
  },
  {
    text: "A number minus 45 equals 15. What is the number?",
    answer: "60",
    options: ["55", "58", "60", "65"]
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
    text: "What is the next number: 1, 3, 6, 10, __?",
    answer: "15",
    options: ["13", "14", "15", "16"]
  },
  
  {
    text: "What is the missing number: 2, 3, 5, 9, __?",
    answer: "17",
    options: ["13", "15", "17", "19"]
  },
  {
    text: "If 5 pencils cost 25 units, how much do 8 pencils cost?",
    answer: "40",
    options: ["32", "36", "40", "45"]
  },
  {
    text: "A number minus 7 equals 18. What is the number?",
    answer: "25",
    options: ["21", "23", "25", "27"]
  },
  {
    text: "What number comes next: 1, 3, 6, 10, __?",
    answer: "15",
    options: ["13", "14", "15", "16"]
  },
   {
    text: "What is the next number: 3, 6, 11, 18, __?",
    answer: "27",
    options: ["24", "25", "27", "30"]
  },
    {
    text: "Find the missing number: 1, 4, 9, 16, __",
    answer: "25",
    options: ["20", "24", "25", "30"]
  },
   {
    text: "What is the missing number: 5, 10, 20, 40, __?",
    answer: "80",
    options: ["60", "70", "80", "90"]
  },
    {
    text: "Find the missing number: 100, 90, 80, __, 60",
    answer: "70",
    options: ["65", "68", "70", "75"]
  },
    {
    text: "What is the missing number: 4, 8, 16, __?",
    answer: "32",
    options: ["24", "28", "30", "32"]
  },
 

   {
    text: "Find the missing number: 2, 4, 8, 16, __?",
    answer: "32",
    options: ["24", "28", "32", "36"]
  },
   {
    text: "What comes next: 3, 9, 27, __?",
    answer: "81",
    options: ["54", "72", "81", "90"]
  },
    {
    text: "Find the missing number: 10, 20, 30, __?",
    answer: "40",
    options: ["35", "38", "40", "45"]
  },
  {
    text: "Find the missing number: 1, 4, 9, __, 25",
    options: ["14", "15", "16"],
    answer: "16"
  },
    {
    text: "What comes next: 11, 22, 33, __?",
    answer: "44",
    options: ["40", "42", "44", "46"]
  },
  {
    text: "Find the missing number: 4, 12, 36, __?",
    answer: "108",
    options: ["96", "100", "108", "120"]
  },
    {
    text: "Find the missing number: 9, 18, 36, __?",
    answer: "72",
    options: ["54", "60", "72", "81"]
  },
   {
    text: "What is the next number: 10, 20, 40, 80, __?",
    answer: "160",
    options: ["120", "140", "160", "180"]
  },
 
  {
    text: "What is the next number: 5, 25, 125, __?",
    answer: "625",
    options: ["300", "500", "625", "750"]
  },

  {
    text: "Find the missing number: 3, 6, 12, 24, __?",
    answer: "48",
    options: ["36", "42", "48", "60"]
  },
 
  {
    text: "What comes next: 1, 8, 27, __?",
    answer: "64",
    options: ["48", "54", "64", "72"]
  },
  {
    text: "Find the missing number: 15, 30, 45, __?",
    answer: "60",
    options: ["55", "58", "60", "65"]
  },
    {
    text: "What is the next number: 20, 18, 16, __?",
    answer: "14",
    options: ["12", "13", "14", "15"]
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
    text: "Find the missing number: 7, 14, 21, __?",
    answer: "28",
    options: ["24", "26", "28", "30"]
  },
 {
    text: "What is the next number: 1, 2, 4, 8, __?",
    answer: "16",
    options: ["12", "14", "16", "18"]
  },
  {
    text: "Find the missing number: 9, 18, 27, __?",
    answer: "36",
    options: ["32", "34", "36", "38"]
  },
    {
    text: "What is the next number: 5, 10, 15, 20, __?",
    answer: "25",
    options: ["22", "24", "25", "30"]
  },
     {
    text: "Find the missing number: 6, 12, 18, __?",
    answer: "24",
    options: ["20", "22", "24", "26"]
  },
   {
    text: "What is the missing number: 1, 4, 7, 10, __?",
    answer: "13",
    options: ["11", "12", "13", "14"]
  },
  {
    text: "What number comes next: 2, 5, 10, 17, __?",
    answer: "26",
    options: ["22", "24", "26", "28"]
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
export const puzzlep2 = (req, res) => {
genQ(req,res,puzz2)
};
export const puzzlep3 = (req, res) => {
genQ(req,res,puzz3)
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
