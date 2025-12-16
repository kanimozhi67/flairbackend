import mongoose from "mongoose";

const userProgressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  score: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("UserProgress", userProgressSchema);


// const userProgressSchema = new mongoose.Schema({
//   user: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: "User", 
//     required: true 
//   },
//   puzzleId: { 
//     type: String, 
//     required: true 
//   },
//   score: { 
//     type: Number, 
//     required: true 
//   },
//   totalQuestions: { 
//     type: Number, 
//     required: true 
//   },
//   accuracy: { 
//     type: Number 
//   },
//   timeTaken: { 
//     type: Number // seconds
//   },
//   date: { 
//     type: Date, 
//     default: Date.now 
//   }
// });

// export default mongoose.model("UserProgress", userProgressSchema);
