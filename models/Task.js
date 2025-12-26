// models/Task.js
import mongoose from "mongoose";

const LevelSchema = new mongoose.Schema({
  level: String, // kindergarden,primary
  selectedLevel:Number,//1,2,3
  points: Number,
  completed: { type: Boolean, default: false }
});

const CategorySchema = new mongoose.Schema({
  name: {
    type: String, // Measurement, Addition, etc.
    required: true,
  },
  // Measurement, Addition & Subtraction, Sorting, Sudoku,Logical questiions,Puzzles, Multiplication, Money, 
  //shapes,measurement,time ,fraction

  levels: [LevelSchema]
});

const TaskSchema = new mongoose.Schema(
  {
    title: String, // "Today's Task"
    description: String,
    categories: [CategorySchema],
    active: { type: Boolean, default: true },
    date: { type: String }, // YYYY-MM-DD
  },
  { timestamps: true }
);

export default mongoose.model("Task", TaskSchema);
