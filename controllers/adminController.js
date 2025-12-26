import Task from "../models/Task.js";


export const createtask = async (req, res) => {
    try {
      const task = await Task.create(req.body);
      res.status(201).json({ message: "Task created", task });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }


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
