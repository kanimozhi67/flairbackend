
import jwt from "jsonwebtoken";
import User from "../models/User.js";

 const  authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Not authenticated" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ error: "User not found" });

    req.user = user; // <-- this fixes the undefined _id
    next();
  } catch (err) {
    console.log(`Auth middleware error: ${err}`);
    res.status(401).json({ error: "Not authorized" });
  }
};
export default authMiddleware;


