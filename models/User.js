import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
      default: "/img/rabbitAvatar.png",
    },
    sticker: {
      type: [String],
      default: [],
    },
    password: {
      type: String,
      required: true,
    },
    class: {
      type: String,
      default:"App Class"
    },
    section: {
      type: String,
      default: "App Section",
    },
    level: {
      type: String,
      //   enum: ["kindergarden", "primary"],
      // required: true,
    
    },

    // 🔐 ADD THIS
    role: {
      type: String,
      enum: ["User", "Admin"],
      default: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
