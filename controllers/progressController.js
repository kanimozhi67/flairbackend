import UserProgress from "../models/UserProgress.js";
import moment from "moment";
import User from "../models/User.js";


export async function addPoints(req, res) {
  const userId = req.user.id;
  const { points } = req.body;

  const startOfDay = moment().startOf("day").toDate();
  const endOfDay = moment().endOf("day").toDate();

  try {
    let record = await UserProgress.findOne({
      user: userId,
      date: { $gte: startOfDay, $lte: endOfDay }
    });

    if (!record) {
      record = new UserProgress({
        user: userId,
        date: new Date(),
        score: 0
      });
    }

    record.score += points;
    await record.save();

    res.json({ message: "Points added", total: record.score });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getTodayPoints(req, res) {
  const userId = req.user.id;

  const startOfDay = moment().startOf("day").toDate();
  const endOfDay = moment().endOf("day").toDate();

  try {
    const record =
      (await UserProgress.findOne({
        user: userId,
        date: { $gte: startOfDay, $lte: endOfDay }
      })) || { score: 0 };

    res.json({ points: record.score });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getProgressSummary(req, res) {
  const userId = req.user.id;
  const { range } = req.query;
  const days = parseInt(range) || 7;

  const startDate = moment().subtract(days, "days").startOf("day").toDate();

  try {
    const records = await UserProgress.find({
      user: userId,
      date: { $gte: startDate }
    }).sort({ date: 1 });

    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}





// GET /quiz/leaderboard?userId=xxx



export const leaderboard = async (req, res) => {
  try {
    // Accept userId from query or URL param
    const currentUserId = req.query.userId || req.params.userId;

    // 1️⃣ Aggregate total scores per user
    const aggregated = await UserProgress.aggregate([
      {
        $group: {
          _id: "$user",
          totalScore: { $sum: "$score" },
        },
      },
      { $sort: { totalScore: -1 } },
    ]);

    // 2️⃣ Populate usernames
    const populated = await User.populate(aggregated, {
      path: "_id",
      select: "username",
    });

    // 3️⃣ Filter out invalid users
    const leaderboardResult = populated
      .filter(item => item._id) // skip missing users
      .map((item, index) => ({
        userId: item._id._id,
        username: item._id.username,
        points: item.totalScore,
        rank: index + 1,
      }));

    // 4️⃣ Top 5 users
    const top5 = leaderboardResult.slice(0, 5);

    // 5️⃣ Find current user (may be outside top 5)
    let currentUser = null;
    if (currentUserId) {
      currentUser = leaderboardResult.find(
        (u) => String(u.userId) === String(currentUserId)
      );
    }

    res.json({ top5, currentUser });
  } catch (err) {
    console.error("Leaderboard error:", err);
    res.status(500).json({ message: "Failed to get leaderboard" });
  }
};




