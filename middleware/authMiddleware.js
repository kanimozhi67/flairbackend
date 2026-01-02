import jwt from "jsonwebtoken";
import User from "../models/User.js";
import StudentModel from "../models/StudentModel.js";

const authMiddleware = async (req, res, next) => {
  try {
   // const token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];
   const token = req.headers.authorization?.split(" ")[1] || req.cookies.jwt;

    if (!token) return res.status(401).json({ error: "Not authenticated" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded token:", decoded);

    let account;
    if (decoded.model === "User") {
      account = await User.findById(decoded.id).select("-password");
    } else if (decoded.model === "Student" || decoded.model === "StudentModel") {
      // Accept both names for compatibility
      account = await StudentModel.findById(decoded.id).select("-password");
    } else {
      return res.status(401).json({ error: "Invalid token model" });
    }

    if (!account) return res.status(401).json({ error: "Account not found" });

    req.user = {
      id: account._id.toString(),
      role: decoded.role,  // e.g., "Student"
      model: decoded.model,
    };

    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(401).json({ error: "Not authorized" });
  }
};


export default authMiddleware;
