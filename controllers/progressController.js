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

    if (!points || typeof points !== "number") {
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
        if (item._id.ownerType === "User") {
          owner = await User.findById(item._id.ownerId).select("username level");
        } else {
          owner = await StudentModel.findById(item._id.ownerId).select(
            "username level"
          );
        }
        return {
          ownerId: item._id.ownerId,
          ownerType: item._id.ownerType,
          username: owner?.username || "Unknown",
          level: owner?.level || "Unknown",
          points: item.totalScore,
        };
      })
    );

    // 3️⃣ Filter by level if provided
    let filtered = level ? populated.filter((u) => u.level === level) : populated;

    // 4️⃣ Sort descending by points
    filtered.sort((a, b) => b.points - a.points);

    // 5️⃣ Map leaderboard format
    const leaderboardResult = filtered.map((u, index) => ({
      userId: u.ownerId,
      username: u.username,
      points: u.points,
      rank: index + 1,
      level: u.level,
    }));

    // 6️⃣ Top 5
    const top5 = leaderboardResult.slice(0, 5);

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


/**
 * GET /quiz/leaderboard/school?schoolId=xxx&className=YYY&studentId=ZZZ
 * Returns leaderboard for a school class including rollNo
 */


// export const schoolLeaderboard = async (req, res) => {
//   try {
//     const { userId } = req.query;

//     // 1️⃣ Find the logged-in student
//     const student = await StudentModel.findById(userId);
//     if (!student) {
//       return res.json({ top5: [], message: "Only students have school leaderboard" });
//     }

//     const { school: schoolId, className, section } = student;

//     // 2️⃣ Get all students in the same school & class
//     const studentsInClass = await StudentModel.find({
//       school: schoolId,
//       className,
//     }).select("_id username rollNo className section");

//     const studentIds = studentsInClass.map((s) => s._id);

//     if (!studentIds.length) {
//       return res.json({ top5: [] });
//     }

//     // 3️⃣ Aggregate points for these students
//     const agg = await UserProgress.aggregate([
//       { $match: { ownerId: { $in: studentIds }, ownerType: "Student" } },
//       { $group: { _id: "$ownerId", totalScore: { $sum: "$score" } } },
//     ]);

//     // 4️⃣ Populate username, rollNo, className, section
//     const populated = await StudentModel.populate(agg, {
//       path: "_id",
//       select: "username rollNo className section",
//     });

//     // 5️⃣ Sort by points descending
//     populated.sort((a, b) => b.totalScore - a.totalScore);

//     // 6️⃣ Map to leaderboard format
//     const leaderboardResult = populated.map((item, index) => ({
//       studentId: item._id._id,
//       username: item._id.username,
//       rollNo: item._id.rollNo,
//       className: item._id.className,
//       section: item._id.section,
//       points: item.totalScore,
//       rank: index + 1,
//     }));

//     res.json({ top5: leaderboardResult.slice(0, 5) });
//   } catch (err) {
//     console.error("School leaderboard error:", err);
//     res.status(500).json({ message: "Failed to get school leaderboard" });
//   }
// };



export const schoolLeaderboard = async (req, res) => {
  try {
    const { userId } = req.query;

    // 1️⃣ Get logged-in student
    const student = await StudentModel.findById(userId);
    if (!student) {
      return res.json({ top5: [], message: "Only students have school leaderboard" });
    }

    const { school: schoolId, className } = student;

    // 2️⃣ Find all students in the same school & class
    const studentsInClass = await StudentModel.find({
      school: schoolId,
      className,
    }).select("_id username rollNo className section");

    const studentIds = studentsInClass.map((s) => s._id);

    if (studentIds.length === 0) {
      return res.json({ top5: [] });
    }

    // 3️⃣ Aggregate points for all students in class
    const agg = await UserProgress.aggregate([
      { 
        $match: { 
          ownerType: "Student",
          ownerId: { $in: studentIds.map((id) => new mongoose.Types.ObjectId(id)) },
        } 
      },
      {
        $group: {
          _id: "$ownerId",
          totalScore: { $sum: "$score" },
        }
      },
      { $sort: { totalScore: -1 } },
      { $limit: 5 }
    ]);

    // 4️⃣ Attach student info
    const leaderboardResult = await Promise.all(
      agg.map(async (item, index) => {
        const s = studentsInClass.find((stu) => stu._id.equals(item._id));
        return {
          studentId: s._id,
          username: s.username,
          rollNo: s.rollNo,
          className: s.className,
          section: s.section,
          points: item.totalScore,
          rank: index + 1,
        };
      })
    );

    res.json({ top5: leaderboardResult });

  } catch (err) {
    console.error("School leaderboard error:", err);
    res.status(500).json({ message: "Failed to get school leaderboard" });
  }
};
