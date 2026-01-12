import Task from "../models/Task.js";
import UserTask from "../models/UserTask.js";
import User from "../models/User.js";
import StudentTask from "../models/StudentTask.js";
import StudentModel from "../models/StudentModel.js";
import StudentAssignedTask from "../models/StudentAssignedTask.js";
import UserProgress from "../models/UserProgress.js";
import nodemailer from "nodemailer";
import mongoose from "mongoose";
import moment from "moment";


// export const getAllUser = async (req, res) => {
//   try {

//     // 1️⃣ Aggregate total scores by ownerId + ownerType
//     const agg = await UserProgress.aggregate([
//       {
//         $group: {
//           _id: { ownerId: "$ownerId", ownerType: "$ownerType" },
//           totalScore: { $sum: "$score" },
//         },
//       },
//     ]);

//     // 2️⃣ Populate usernames and levels
//     const populated = await Promise.all(
//       agg.map(async (item) => {
//         let owner;
       
//          if (item._id.ownerType === "User") {
//       owner = await User.findOne({
//         _id: item._id.ownerId,
//       }).select("username email level role sticker");
    
//     } 

//         return{
//           ownerId: item._id.ownerId,
//          email: owner.email,
//          sticker:owner.sticker,
//           username: owner?.username || "Unknown",
//           role:owner?.role,
//           level: owner?.level || "Unknown",
//           points: item.totalScore,
//         };
//       })
//     );
// const filtered = populated.filter((u=>u.role!=="Admin"));
//  console.log(filtered)
//     // 4️⃣ Sort descending by points
//     filtered.sort((a, b) => b.points - a.points);

//     // 5️⃣ Map leaderboard format
//     const users = filtered.map((u, index) => ({
//       userId: u.ownerId,
//       username: u.username,
//       points: u.points,
//       email:u.email,
//       sticker:u.sticker,
//      // rank: index + 1,
//       level: u.level,
//       role:u.role,
//     }));
//   //   const role = "User";
//   // const users = await User.find({ role }).select("username email level sticker");


//     res.status(200).json(users);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to fetch users" });
//   }
// };
export const getAllUser = async (req, res) => {
  try {
    const users = await User.aggregate([
      // 1️⃣ Exclude admins if needed
      {
        $match: {
          role: { $ne: "Admin" }
        }
      },

      // 2️⃣ Join user progress
      {
        $lookup: {
          from: "userprogresses", // ⚠️ collection name (check plural!)
          let: { userId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$ownerId", "$$userId"] },
                    { $eq: ["$ownerType", "User"] }
                  ]
                }
              }
            }
          ],
          as: "progress"
        }
      },

      // 3️⃣ Calculate total score
      {
        $addFields: {
          points: { $sum: "$progress.score" }
        }
      },

      // 4️⃣ Select final fields
      {
        $project: {
          username: 1,
          email: 1,
          level: 1,
          role: 1,
          sticker: 1,
          points: 1
        }
      },

      // 5️⃣ Sort leaderboard
      {
        $sort: { points: -1 }
      }
    ]);

    res.status(200).json(
      users.map((u) => ({
        userId: u._id,
        username: u.username,
        email: u.email,
        level: u.level,
        role: u.role,
        sticker: u.sticker,
        points: u.points || 0
      }))
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};



export const updateUserScore = async (req, res) => {
  try {
    const { id } = req.params;
    const { score } = req.body;

    // 1️⃣ Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // 2️⃣ Validate score
    if (typeof score !== "number") {
      return res.status(400).json({ message: "Score must be a number" });
    }

    const dayKey = moment().utc().format("YYYY-MM-DD");

    // 3️⃣ Remove ONLY today's score
    await UserProgress.deleteMany({
      ownerId: id,
      ownerType: "User",
      dayKey,
    });

    // 4️⃣ Create new score entry
    const progress = await UserProgress.create({
      ownerId: id,
      ownerType: "User",
      score,
      dayKey,
    });

    res.status(200).json({
      message: "Score updated successfully",
      progress,
    });
  } catch (error) {
    console.error("Update score error:", error);
    res.status(500).json({ message: "Failed to update score" });
  }
};




export const updateUser = async (req, res) => {
  try {
    const { id } = req.params; // ✅ FIXED
    const { username, email, level, sticker } = req.body;

    // 1️⃣ Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // 2️⃣ Check user exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 3️⃣ Prevent email duplication
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    // 4️⃣ Update allowed fields
    if (username !== undefined) user.username = username;
    if (email !== undefined) user.email = email;
    if (level !== undefined) user.level = level;
    if (sticker !== undefined) user.sticker = sticker;

    await user.save();

    res.status(200).json({
      message: "User updated successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        level: user.level,
        sticker: user.sticker,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ message: "Failed to update user" });
  }
};



export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // 1️⃣ Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // 2️⃣ Check user exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 3️⃣ Delete related progress
    await UserProgress.deleteMany({
      ownerId: id,
      ownerType: "User",
    });

    // 4️⃣ Delete user
    await User.findByIdAndDelete(id);

    res.status(200).json({
      message: "User deleted successfully",
      userId: id,
    });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ message: "Failed to delete user" });
  }
};

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
