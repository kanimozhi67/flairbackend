import UserProgress from "../models/UserProgress.js";
import User from "../models/User.js";

export const getUserInfo = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).select("username avatar");

    // Get total score for today
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const todayScores = await UserProgress.aggregate([
      { $match: { user: user._id, date: { $gte: startOfDay } } },
      { $group: { _id: "$user", totalScoreToday: { $sum: "$score" } } },
    ]);

    const totalScoreToday = todayScores.length ? todayScores[0].totalScoreToday : 0;

    res.json({
      username: user.username,
      avatar: user.avatar,
      totalScoreToday,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
