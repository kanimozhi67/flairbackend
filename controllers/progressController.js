import UserProgress from "../models/UserProgress.js";
import moment from "moment";

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
