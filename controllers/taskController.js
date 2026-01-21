import Task from "../models/Task.js";
import UserTask from "../models/UserTask.js";
import User from "../models/User.js";
import StudentAssignedTask from "../models/StudentAssignedTask.js";
import StudentTask from "../models/StudentTask.js"
import Completed from "../models/Completed.js";


// GET completed tasks by userId
export const getCompleted = async (req, res) => {
  try {
    const { userId } = req.params;

    const today = getLocalDate();

  const completed = await Completed.findOne({ userId, date: today });

    if (!completed) {
      return res.status(404).json({
        success: false,
        message: "No completed tasks found for this user",
      });
    }

    res.status(200).json({
      success: true,
      data: completed,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch completed tasks",
    });
  }
};
const getLocalDate = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() + now.getTimezoneOffset() * -1);
  return now.toISOString().split("T")[0]; // YYYY-MM-DD
};
export const addCompleted = async (req, res) => {
  try {
    const {
      userId,
      level,
      category,
      selectedLevel,
      points = 0,
    } = req.body;

    // Find existing completed record for user
  
const today = getLocalDate();

  let completed = await Completed.findOne({ userId, date: today });

 
    if (!completed) {
      // Create new document if not exists
      completed = new Completed({
        userId,
          date: today,
        totalPoints: points,
        completedLevel: [level],
        completedCategory: [category],
        completedSelectedLevel: [selectedLevel],
        completedPoints: [points],
      });
    } else {
      // Update existing document
       
      completed.completedLevel.push(level);
      completed.completedCategory.push(category);
      completed.completedSelectedLevel.push(selectedLevel);
      completed.completedPoints.push(points);
      completed.totalPoints += points;
    }

    await completed.save();

    res.status(200).json({
      success: true,
      message: "Completed task added successfully",
      data: completed,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to add completed task",
    });
  }
};


export const todaytaskStudent = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userTasks = await StudentAssignedTask.find({
      student: req.user.id,
      completed: false, // only incomplete tasks
    })
      .populate("task")
      .lean();

    const today = new Date().toISOString().split("T")[0];

    const response = userTasks
      .filter((ut) => ut.task && ut.task.active)
      // optional: only today’s tasks
      // .filter((ut) => ut.taskId.date === today)
      .map((ut) => ({
        userTaskId: ut._id,
        task: ut.task._id,
        title: ut.task.title,
        description: ut.task.description,
        date: ut.task.date,
        totalPoints: ut.totalPoints,
        className:ut.className,
        section:ut.section,
        categories: ut.progress.map((cat) => ({
          name: cat.categoryName,
          levels: cat.levels.filter((lvl) => !lvl.completed), // 🔥 only pending levels
        })),
      }))
      // remove categories with no pending levels
      .map((taskitem) => ({
        ...taskitem,
        categories: taskitem.categories.filter((c) => c.levels.length > 0),
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




export const completetaskStudent = async (req, res) => {
  try {
    const { userTaskId, categoryName, selectedLevel, score, points } = req.body;

    const userTask = await StudentAssignedTask.findById(userTaskId).populate("task");
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

// Get all tasks with students who completed them


export const getTaskBoardStudent = async (req, res) => {
  try {
    const tasks = await StudentTask.find().sort({ createdAt: -1 });

    const result = await Promise.all(
      tasks.map(async (task) => {
        const userTasks = await StudentAssignedTask.find({ taskId: task._id, completed: true })
          .populate("student", "username rollNo");

        const completedStudents = userTasks.map(ut => ({
          username: ut.student?.username || "Unknown",
          rollNo: ut.student?.rollNo || "Unknown",
          totalPoints: ut.totalPoints || 0,
          level: ut.level || task.level || "Unknown", // ✅ reliable
        }));

        return {
          taskId: task._id,
          title: task.title,
          date: task.date,
          categories: task.categories.map(c => c.name),
          active: task.active,
          className:task.className,
          section:task.section,
          level: task.level, // task level
          completedStudents,
        };
      })
    );

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch task board", error: err.message });
  }
};
export const getTaskBoard = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });

    const result = await Promise.all(
      tasks.map(async (task) => {
        const userTasks = await UserTask.find({ taskId: task._id, completed: true })
          .populate("userId", "username email");

        const completedStudents = userTasks.map(ut => ({
          username: ut.userId?.username || "Unknown",
          email: ut.userId?.email || "Unknown",
          totalPoints: ut.totalPoints || 0,
          level: ut.level || task.level || "Unknown", // ✅ reliable
        }));

        return {
          taskId: task._id,
          title: task.title,
          date: task.date,
          categories: task.categories.map(c => c.name),
          active: task.active,
          level: task.level, // task level
          completedStudents,
        };
      })
    );

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch task board", error: err.message });
  }
};




