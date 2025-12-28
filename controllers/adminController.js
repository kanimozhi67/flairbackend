import Task from "../models/Task.js";
import UserTask from "../models/UserTask.js";
import User from "../models/User.js";



export const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      level,          // kindergarten | primary
      selectedLevel,  // 1 | 2 | 3
      date,
      active,
    } = req.body;

    // ✅ Normalize level
    const normalizedLevel = level.toLowerCase();

    // ✅ Create Task WITH level
    const task = await Task.create({
      title,
      description,
      date,
      active,
      level: normalizedLevel, // 🔥 ADD THIS
      categories: [
        {
          name: category,
          levels: [
            {
              level: normalizedLevel,
              selectedLevel,
              points: 10,
            },
          ],
        },
      ],
    });

    // ✅ Find users eligible for this task
    const users = await User.find({
      level: normalizedLevel,
    });

    // ✅ Create UserTask entries
    const userTasks = users.map((user) => ({
      userId: user._id,
      taskId: task._id,
      progress: [
        {
          categoryName: category,
          levels: [
            {
              level: normalizedLevel,
              selectedLevel,
              completed: false,
              score: 0,
            },
          ],
        },
      ],
      totalPoints: 0,
      completed: false,
    }));

    await UserTask.insertMany(userTasks);

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to create task",
      error: err.message,
    });
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


// DELETE /api/admin/task/:id
export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    // Delete the task
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Optionally, remove related UserTask entries
    await UserTask.deleteMany({ taskId });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete task", error: err.message });
  }
};
