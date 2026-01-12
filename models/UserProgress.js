import mongoose from "mongoose";

const userProgressSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true,
  },
  ownerType: {
    type: String,
    enum: ["User", "Student"],
    required: true,
    index: true,
  },
  score: {
    type: Number,
    default: 0,
    required: true,
  },
   dayKey: {
    type: String, // "2026-01-01"
    required: true,
    index: true,
  },
});

userProgressSchema.index({ ownerId: 1, ownerType: 1, dayKey: 1 });
export default mongoose.model("UserProgress", userProgressSchema);
