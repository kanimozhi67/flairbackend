import mongoose from "mongoose";

const SchoolSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
    zipCode: {
      type: String,
      default: "",
    },
    // Optional: array of teachers (can also populate from Teacher collection)
    teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Teacher" }],
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "StudentModel" }],
  },
  { timestamps: true }
);

SchoolSchema.index({ city: 1, state: 1 }); // optional for filtering


export default mongoose.model("School", SchoolSchema);
