// models/Task.js
import mongoose from "mongoose";

const LevelSchema = new mongoose.Schema({
  level: {
    type: String,
    enum: ["kindergarten", "primary"], // ✅ enforce spelling
    required: true,
  },
  selectedLevel: {
    type: Number,
    enum: [1, 2, 3],
    required: true,
  },
  points: {
    type: Number,
    default: 10,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const CategorySchema = new mongoose.Schema({
  name: {
    type: String, // Measurement, Addition, etc.
    required: true,
  },
  levels: [LevelSchema],
});

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    // 🔥 ADD THIS (VERY IMPORTANT)
    level: {
      type: String,
      enum: ["kindergarten", "primary"],
      required: true,
      index: true, // improves filtering performance
    },

    categories: [CategorySchema],

    active: {
      type: Boolean,
      default: true,
    },

    date: {
      type: String, // YYYY-MM-DD
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", TaskSchema);
