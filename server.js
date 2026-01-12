import express from "express";
import dotenv from "dotenv";


// 🔥 FORCE PATH (Windows-safe)
dotenv.config({ path: "./.env" });



import authRoutes from "./routes/authRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import { stripeWebhook } from "./controllers/paymentController.js";
import cors from "cors";

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
import adminRoutes from "./routes/adminRoutes.js";
import stripe from "./utils/stripe.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();
const PORT = process.env.PORT;
console.log(`PORT= ${PORT}`);

app.use(
  cors({
    origin: [
      "http://localhost:3000","http://localhost:5173",
      "https://flairfrontend.vercel.app",
      process.env.FRONTEND_URL,
    ], // your frontend URL
     methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
       allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // important: allow cookies
  })
);
 //app.options("/*", cors());



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Routes
app.use("/test", (req, res) => {
  return res.json({ message: "app is working" });
});


app.get("/stripe-test", async (req, res) => {
  const balance = await stripe.balance.retrieve();
  res.json(balance);
});

app.use("/api/admin",adminRoutes)
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
// app.get("/api/quiz/math", generateQuestionAddSub);
// app.post("/api/quiz/check", checkAnswer);
app.use("/api/quiz/progress", progressRoutes);
app.get("/api/profile", getUserInfo);
app.use("/img", express.static(path.join(__dirname, "img")));
app.use("/api/payment", paymentRoutes);
app.post(
  "/payment/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

async function startServer() {
  try {
    // Connect to MongoDB first
    await connectdb();
    // Then start the server
    app.post("/api/payment/createcheckoutsession", (req, res) => {
  res.json({ ok: true });
});
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      

// 👀
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}
startServer();
