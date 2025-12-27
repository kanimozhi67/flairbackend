// // models/UserTask.js
// import mongoose from "mongoose";

// const UserTaskSchema = new mongoose.Schema(
//   {
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//     taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
//     progress: [
//       {level: String,
//         category: String,
//         selectedLevel: Number,
//         completed: Boolean,
//         score: Number
//       }
//     ],
//     totalPoints: { type: Number, default: 0 },
//     completed: { type: Boolean,
//       // default: false 
//       }
//   },
//   { timestamps: true }
// );

// export default mongoose.model("UserTask", UserTaskSchema);
// models/UserTask.js
import mongoose from "mongoose";

const UserLevelProgressSchema = new mongoose.Schema({
  selectedLevel: Number,
  completed: { type: Boolean, default: false },
  score: { type: Number, default: 0 },
});

const UserCategoryProgressSchema = new mongoose.Schema({
  categoryName: String,
  levels: [UserLevelProgressSchema],
});

const UserTaskSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task", required: true },
    progress: [UserCategoryProgressSchema], // mirrors Task.categories
    totalPoints: { type: Number, default: 0 },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("UserTask", UserTaskSchema);
