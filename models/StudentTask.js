// models/Task.js
import mongoose from "mongoose";

const SLevelSchema = new mongoose.Schema({
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

const SCategorySchema = new mongoose.Schema({
  name: {
    type: String, // Measurement, Addition, etc.
    required: true,
  },
  levels: [SLevelSchema],
});

const StudentTaskSchema = new mongoose.Schema(
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

    categories: [SCategorySchema],
className: {
    type: String,
required: true,
},
section: {
    type: String,
required: true,
},
    active: {
      type: Boolean,
      default: true,
    },

    date: {
      type: String, // YYYY-MM-DD
    },
      school: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "School",
          required: true,
        },
  },
  { timestamps: true }
);

export default mongoose.model("StudentTask", StudentTaskSchema);
