import User from "../models/User.js";
import express  from "express";

const router = express.Router();


// Add stickers to user
export const addStickers = async (req, res) => {
  const { userId } = req.params;
  const { sticker } = req.body; // expect an array of emoji strings
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.sticker.push(...sticker);
    await user.save();

    res.json({ message: "Stickers added", stickers: user.sticker });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

// Get user stickers
export const getStickers = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ stickers: user.sticker });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}


