import mongoose from "mongoose";

const TeacherSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true, // Each teacher belongs to a school
    },
    role: {
      type: String,
      enum: ["Teacher", "SchoolAdmin"],
      default: "Teacher",
    },
     className: {
      type: String,
      required: true,
    },
     section: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Teacher", TeacherSchema);
