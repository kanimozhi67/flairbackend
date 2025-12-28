import mongoose from "mongoose";

const userProgressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  score: { type: Number, required: true ,default:0},
  date: { type: Date, default: Date.now },
});

export default mongoose.model("UserProgress", userProgressSchema);

