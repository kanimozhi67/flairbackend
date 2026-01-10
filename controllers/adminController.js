import Task from "../models/Task.js";
import UserTask from "../models/UserTask.js";
import User from "../models/User.js";
import StudentTask from "../models/StudentTask.js";
import StudentModel from "../models/StudentModel.js";
import StudentAssignedTask from "../models/StudentAssignedTask.js";

import nodemailer from "nodemailer";


export const feedback = async (req, res) => {
  try {
    const { name, email, message} = req.body;

    // 🔒 Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Flair Olympiad" <${process.env.EMAIL_USER}>`,
      to: "flairolympiad@gmail.com",
      replyTo: email,
      subject: "Feedback",
      html: `
        <h3>FEEDBACK</h3>
        <table border="1" cellpadding="8" cellspacing="0">
          <tr><td><b>Name</b></td><td>${name}</td></tr>
          <tr><td><b>Email</b></td><td>${email}</td></tr>
          <tr><td><b>Message</b></td><td>${message}</td></tr>
         
        </table>
      `,
    });

    return res.status(200).json({ success: true, message: "Email sent successfully" });

  } catch (error) {
    console.error("Email error:", error);
    return res.status(500).json({ success: false, message: "Failed to send email" });
  }
};
export const joinform = async (req, res) => {
  try {
    const { name, email, mobile, grade, country } = req.body;

    // 🔒 Basic validation
    if (!name || !email || !mobile || !grade || !country) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Flair Olympiad" <${process.env.EMAIL_USER}>`,
      to: "flairolympiad@gmail.com",
      replyTo: email,
      subject: "New Student Registration",
      html: `
        <h3>New Student Registration</h3>
        <table border="1" cellpadding="8" cellspacing="0">
          <tr><td><b>Name</b></td><td>${name}</td></tr>
          <tr><td><b>Email</b></td><td>${email}</td></tr>
          <tr><td><b>Mobile</b></td><td>${mobile}</td></tr>
          <tr><td><b>Grade</b></td><td>${grade}</td></tr>
          <tr><td><b>Country</b></td><td>${country}</td></tr>
        </table>
      `,
    });

    return res.status(200).json({ success: true, message: "Email sent successfully" });

  } catch (error) {
    console.error("Email error:", error);
    return res.status(500).json({ success: false, message: "Failed to send email" });
  }
};


export const screateTask = async (req, res) => {
  try {
    const {
      school,
      title,
      description,
      category,
      className,
      section,
      level,
      selectedLevel,
      date,
      active,
    } = req.body;

    if (!school) {
      return res.status(400).json({ message: "School ID is required" });
    }

    const normalizedClass = className.trim().toLowerCase();
    const normalizedSection = section.trim().toLowerCase();

    // 1️⃣ Create task
    const task = await StudentTask.create({
      school,
      title,
      description,
      level,
      date,
      active,
      className: normalizedClass,
      section: normalizedSection,
      categories: [
        {
          name: category,
          levels: [
            {
              level,           // ✅ FIXED
              selectedLevel,
              points: 10,
            },
          ],
        },
      ],
    });

    // 2️⃣ Find eligible students

    const students = await StudentModel.find({
  school,
  level,
  className: { $regex: `^${className.trim()}$`, $options: "i" },
  section: { $regex: `^${section.trim()}$`, $options: "i" },
});
   

    if (!students.length) {
      return res.status(404).json({
        message: "No students found for selected class and section",
      });
    }

    // 3️⃣ Assign task
    const assignedTasks = students.map((student) => ({
      student: student._id,
      task: task._id,
      progress: [
        {
          categoryName: category,
          levels: [
            {
              level,
              selectedLevel,
              completed: false,
              score: 0,
            },
          ],
        },
      ],
    }));

    await StudentAssignedTask.insertMany(assignedTasks);

    res.status(201).json({
      message: "Task created and assigned successfully",
      assignedCount: assignedTasks.length,
    });
  } catch (err) {
    console.error("CREATE TASK ERROR:", err);
    res.status(500).json({
      message: err.message,
    });
  }
};


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




export const sgetTasks = async (req, res) => {
  try {
    const tasks = await StudentTask.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch tasks",
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
