import Task from "../models/Task.js";
import UserTask from "../models/UserTask.js";
import User from "../models/User.js";



export const todaytask = async (req, res) => {
  try {
    if (!req.user ) {
      return res.status(400).json({ message: "User not found" });
    }
    if ( !req.user.level) {
      return res.status(400).json({ message: "User level not found" });
    }

    const studentLevel = req.user.level.toLowerCase();

    const tasks = await Task.find({
      active: true,
      "categories.levels.level": studentLevel,
    });

    const filteredTasks = tasks.map((task) => ({
      ...task.toObject(),
      categories: task.categories.map((cat) => ({
        ...cat.toObject(),
        levels: cat.levels.filter(
          (lvl) => lvl.level.toLowerCase() === studentLevel
        ),
      })),
    }));

    res.status(200).json(filteredTasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch tasks", error: err.message });
  }
};



export const completetask = async (req, res) => {
  const { taskId, category, level, score, points } = req.body;

  const userTask = await UserTask.findOne({
    userId: req.user.id,
    taskId
  });

  userTask.progress.push({
    category,
    level,
    completed: true,
    score
  });

  userTask.totalPoints += points;

  await userTask.save();

  res.json({
    message: "Level completed",
    totalPoints: userTask.totalPoints
  });
}