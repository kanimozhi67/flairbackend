import Task from "../models/Task.js";
import UserTask from "../models/UserTask.js";
import User from "../models/User.js";




export const todaytask = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userTasks = await UserTask.find({
      userId: req.user.id,
      completed: false, // only incomplete tasks
    })
      .populate("taskId")
      .lean();

    const today = new Date().toISOString().split("T")[0];

    const response = userTasks
      .filter((ut) => ut.taskId && ut.taskId.active)
      // optional: only today’s tasks
      // .filter((ut) => ut.taskId.date === today)
      .map((ut) => ({
        userTaskId: ut._id,
        taskId: ut.taskId._id,
        title: ut.taskId.title,
        description: ut.taskId.description,
        date: ut.taskId.date,
        totalPoints: ut.totalPoints,
        categories: ut.progress.map((cat) => ({
          name: cat.categoryName,
          levels: cat.levels.filter((lvl) => !lvl.completed), // 🔥 only pending levels
        })),
      }))
      // remove categories with no pending levels
      .map((task) => ({
        ...task,
        categories: task.categories.filter((c) => c.levels.length > 0),
      }))
      // remove tasks with no pending categories
      .filter((task) => task.categories.length > 0);

    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to fetch today tasks",
      error: err.message,
    });
  }
};




export const completetask = async (req, res) => {
  try {
    const { userTaskId, categoryName, selectedLevel, score, points } = req.body;

    const userTask = await UserTask.findById(userTaskId).populate("taskId");
    if (!userTask) return res.status(404).json({ message: "User task not found" });

    // Find category progress
    const categoryProgress = userTask.progress.find((c) => c.categoryName === categoryName);
    if (!categoryProgress) return res.status(400).json({ message: "Category not found" });

    // Find level progress
    const levelProgress = categoryProgress.levels.find((l) => l.selectedLevel === selectedLevel);
    if (!levelProgress) return res.status(400).json({ message: "Level not found" });

    if (levelProgress.completed) {
      return res.status(400).json({ message: "Level already completed" });
    }

    // Update level progress
    levelProgress.completed = true;
    levelProgress.score = score;
    userTask.totalPoints += points;

    // Check if all levels are completed
    const allCompleted = userTask.progress.every((c) =>
      c.levels.every((l) => l.completed)
    );
    userTask.completed = allCompleted;

    await userTask.save();

    res.status(200).json({
      message: "Level completed",
      totalPoints: userTask.totalPoints,
      completed: userTask.completed,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to complete task", error: err.message });
  }
};
