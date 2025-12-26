// models/UserTask.js
import mongoose from "mongoose";

const UserTaskSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
    progress: [
      {
        category: String,
        level: Number,
        completed: Boolean,
        score: Number
      }
    ],
    totalPoints: { type: Number, default: 0 },
    completed: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("UserTask", UserTaskSchema);
