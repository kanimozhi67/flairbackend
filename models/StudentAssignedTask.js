// models/StudentAssignedTask.js
import mongoose from "mongoose";

const StudentAssignedTaskSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudentModel",
      required: true,
    },
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudentTask",
      required: true,
    },
    progress: [
      {
        categoryName: String,
        levels: [
          {
            level: String,
            selectedLevel: Number,
            completed: Boolean,
            score: Number,
          },
        ],
      },
    ],
    totalPoints: {
      type: Number,
      default: 0,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  "StudentAssignedTask",
  StudentAssignedTaskSchema
);
