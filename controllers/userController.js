import User from "../models/User.js";
import express  from "express";
import Task from "../models/Task.js";
import StudentModel from "../models/StudentModel.js";

const router = express.Router();


// Add stickers to user
export const addStickers = async (req, res) => {
  const { userId } = req.params;
  const { sticker } = req.body; // expects an array of emoji strings

  if (!Array.isArray(sticker)) {
    return res.status(400).json({ message: "Sticker must be an array" });
  }

  try {
    let user = await User.findById(userId);

    if (!user) {
      user = await StudentModel.findById(userId);
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Ensure sticker array exists
    if (!Array.isArray(user.sticker)) {
      user.sticker = [];
    }

    user.sticker.push(...sticker);
    await user.save();

    res.json({ message: "Stickers added", stickers: user.sticker });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// Get user stickers
export const getStickers = async (req, res) => {
  const { userId } = req.params;

  try {
    let user = await User.findById(userId);

    if (!user) {
      user = await StudentModel.findById(userId);
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Ensure sticker is always an array
    res.json({ stickers: user.sticker || [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });

    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch tasks",
      error: err.message,
    });
  }
};
