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
      enum: ["Teacher", "Admin"],
      default: "Teacher",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Teacher", TeacherSchema);
