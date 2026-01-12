import UserProgress from "../models/UserProgress.js";
import moment from "moment";
import User from "../models/User.js";
import StudentModel from "../models/StudentModel.js";

import mongoose from "mongoose";

/**


/**
 * POST /quiz/progress/addpoints
 * Handles adding points for Users or Students
 * req.user = decoded JWT containing { id, role, model, level }
 * req.body = { points, studentId? }
 */

export async function addPoints(req, res) {
  try {
    const { points, studentId } = req.body;
    const { id: userId, model: currentModel } = req.user;

    if ( typeof points !== "number") {
      return res.status(400).json({ message: "Points must be a number" });
    }

    let ownerId, ownerType;

    if (studentId) {
      ownerId = studentId;

      // 🔍 Check which model the ID belongs to
      const student = await StudentModel.findById(studentId);
      if (student) {
        ownerType = "Student";
      } else {
        const user = await User.findById(studentId);
        if (user) {
          ownerType = "User";
        } else {
          return res.status(404).json({ message: "Owner not found" });
        }
      }
    } else {
      // Default: the current logged-in user
      ownerId = userId;
      ownerType = currentModel === "User" ? "User" : "Student";
    }

    const dayKey = moment().utc().format("YYYY-MM-DD");

    // Find or create today's progress record
    let record = await UserProgress.findOne({ ownerId, ownerType, dayKey });
    if (!record) {
      record = new UserProgress({ ownerId, ownerType, score: 0, dayKey });
    }

    record.score += points;
    await record.save();

    res.json({ message: "Points added", score: record.score });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}



export async function getTodayPoints(req, res) {
  try {
    const ownerId = req.user.id;
    const ownerType = req.user.role; // "Student/user"
    const dayKey = moment().utc().format("YYYY-MM-DD");

    // Log for debugging
    console.log({ ownerId, ownerType, dayKey });

    // Find today's record
    const today = await UserProgress.findOne({ ownerId, ownerType, dayKey });
    console.log("today:", today);

    // Total points
    const totalAgg = await UserProgress.aggregate([
      { $match: { ownerId: new mongoose.Types.ObjectId(ownerId), ownerType } },
      { $group: { _id: null, totalScore: { $sum: "$score" } } }
    ]);
    console.log("totalAgg:", totalAgg);

    res.json({
      todayPoints: today?.score ?? 0,
      totalPoints: totalAgg[0]?.totalScore ?? 0
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

/**
 * GET /quiz/progress/summary?range=7
 * Returns progress for the last `range` days for the logged-in user (User or Student)
 */
export async function getProgressSummary(req, res) {
  const { id: userId, model } = req.user;
  const { range } = req.query;
  const days = parseInt(range) || 7;

  const startDate = moment().subtract(days, "days").startOf("day").toDate();

  try {
    let query = { date: { $gte: startDate } };

    if (model === "User") {
      query.user = userId;
    } else if (model === "Students") {
      query.students = userId;
    } else {
      return res.status(403).json({ message: "Forbidden" });
    }

    const records = await UserProgress.find(query).sort({ date: 1 });

    res.json(records);
  } catch (err) {
    console.error("getProgressSummary error:", err);
    res.status(500).json({ error: err.message });
  }
}

// GET /quiz/leaderboard?userId=xxx

/**
 * GET /quiz/leaderboard?userId=xxx&level=kindergarten
 * Returns top 5 Users/Students and current user
 */
export const leaderboard = async (req, res) => {
  try {
    const { userId, level } = req.query;

    // 1️⃣ Aggregate total scores by ownerId + ownerType
    const agg = await UserProgress.aggregate([
      {
        $group: {
          _id: { ownerId: "$ownerId", ownerType: "$ownerType" },
          totalScore: { $sum: "$score" },
        },
      },
    ]);

    // 2️⃣ Populate usernames and levels
    const populated = await Promise.all(
      agg.map(async (item) => {
        let owner;
        // if (item._id.ownerType === "User") {
        //   owner = await User.findById({_id:item._id.ownerId , role: { $ne: "Admin" }}).select("username level role");
        //  console.log(owner)
        // } else {
        //   owner = await StudentModel.findById(item._id.ownerId).select(
        //     "username level role"
        //   );
        // }
         if (item._id.ownerType === "User") {
      owner = await User.findOne({
        _id: item._id.ownerId,
      //  role: { $ne: "Admin" }   // ❌ exclude admin
      }).select("username level role");
    
    } else {
  owner = await StudentModel.findOne({
    _id: item._id.ownerId,
   // role: { $nin: ["SchoolAdmin", "Teacher"] } // ✅ exclude both
  }).select("username level role");
}

        return{
          ownerId: item._id.ownerId,
          ownerType: item._id.ownerType,
          username: owner?.username || "Unknown",
          role:owner?.role,
          level: owner?.level || "Unknown",
          points: item.totalScore,
        };
      })
    );

    // 3️⃣ Filter by level if provided
  //  let filtered = level ? populated.filter((u) => u.level === level ) : populated;
const filtered2 = populated.filter((u=>u.role!=="Teacher"));
const filtered1= filtered2.filter((u=>u.role!=="SchoolAdmin"));
const filtered = filtered1.filter((u=>u.role!=="Admin"));
 
    // 4️⃣ Sort descending by points
    filtered.sort((a, b) => b.points - a.points);

    // 5️⃣ Map leaderboard format
    const leaderboardResult = filtered.map((u, index) => ({
      userId: u.ownerId,
      username: u.username,
      points: u.points,
      rank: index + 1,
      level: u.level,
      role:u.role,
    }));

    // 6️⃣ Top 5
    const top5 = leaderboardResult.slice(0, 5);
console.log("top5:",top5)
    // 7️⃣ Current user
    const currentUser = userId
      ? leaderboardResult.find((u) => String(u.userId) === String(userId))
      : null;

    res.json({ top5, currentUser });
  } catch (err) {
    console.error("Leaderboard error:", err);
    res.status(500).json({ message: "Failed to get leaderboard" });
  }
};




export const schoolLeaderboard = async (req, res) => {
  try {
    const { userId } = req.query;

    const student = await StudentModel.findById(userId);
    if (!student) {
      return res.json({ top5: [], message: "Only students have school leaderboard" });
    }

    const { school: schoolId, className } = student;

    const leaderboard = await StudentModel.aggregate([
      {
        $match: {
          school: schoolId,
          className
        }
      },
      {
        $lookup: {
          from: "userprogresses", // ⚠️ Mongo collection name (plural, lowercase)
          let: { studentId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$ownerType", "Student"] },
                    { $eq: ["$ownerId", "$$studentId"] }
                  ]
                }
              }
            },
            {
              $group: {
                _id: "$ownerId",
                totalScore: { $sum: "$score" }
              }
            }
          ],
          as: "progress"
        }
      },
      {
        $addFields: {
          totalPoints: {
            $ifNull: [{ $arrayElemAt: ["$progress.totalScore", 0] }, 0]
          }
        }
      },
      { $sort: { totalPoints: -1 } },
      { $limit: 5 },
      {
        $project: {
          studentId: "$_id",
          username: 1,
          rollNo: 1,
          className: 1,
          section: 1,
          points: "$totalPoints"
        }
      }
    ]);

    const ranked = leaderboard.map((s, i) => ({
      ...s,
      rank: i + 1
    }));

    res.json({ top5: ranked });

  } catch (err) {
    console.error("School leaderboard error:", err);
    res.status(500).json({ message: "Failed to get school leaderboard" });
  }
};
