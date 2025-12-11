import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
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
    type: String, // single avatar URL for simplicity
    default: "/img/rabbitAvatar.png",
  },
  sticker: {
    type: [String], // single avatar URL for simplicity
    default: [],
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model("User", userSchema);
