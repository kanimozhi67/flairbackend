import mongoose from "mongoose";

const CompletedTaskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
     
    },
      studentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "StudentModel",
        
        },
 date: {
      type: String, // "2026-01-22"
      required: true,
    },
    time:{
 type:[ String], 
     
    },
    totalPoints: {
      type: Number,
      default: 0,
    },

    completedLevel: {
      type: [String],
      default: [],
    },

    completedCategory: {
      type: [String],
      default: [],
    },

    completedPoints: {
      type: [Number],
      default: [],
    },

    completedSelectedLevel: {
      type: [String], // primary, kindergarten
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Completed", CompletedTaskSchema);
