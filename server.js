import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import {
  checkAnswer,
  generateQuestionAddSub,
} from "./controllers/quizController.js";
import progressRoutes from "./routes/progressRoutes.js";
import connectdb from "./db/connectdb.js";
import cookieParser from "cookie-parser";
import { getUserInfo } from "./controllers/getUserInfo.js";
import userRoutes from "./routes/userRoutes.js";
// Make __dirname work in ES modules
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import quizRoutes from "./routes/quizRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
console.log(`PORT= ${PORT}`);

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://flairfrontend.vercel.app",
      process.env.FRONTEND_URL,
    ], // your frontend URL
    credentials: true, // important: allow cookies
  })
);
app.use(express.json());
app.use(cookieParser());
// Routes
app.use("/test", (req, res) => {
  return res.json({ message: "app is working" });
});
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.get("/api/quiz/math", generateQuestionAddSub);
app.post("/api/quiz/check", checkAnswer);
app.use("/api/quiz/progress", progressRoutes);
app.get("api/profile", getUserInfo);
app.use("/img", express.static(path.join(__dirname, "img")));
app.use("/api/quiz", quizRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectdb();
});
