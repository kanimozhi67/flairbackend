// import jwt from "jsonwebtoken";
// import User from "../models/User.js";
// import StudentModel from "../models/StudentModel.js";
// import Teacher from "../models/Teacher.js";

// const authMiddleware = async (req, res, next) => {
//   try {
//     const token =
//       req.headers.authorization?.split(" ")[1] || req.cookies.jwt;

//     if (!token) {
//       return res.status(401).json({ error: "Not authenticated" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("decoded token:", decoded);

//     let account;

//     switch (decoded.model) {
//       case "User":
//         account = await User.findById(decoded.id).select("-password");
//         break;

//       case "Student":
//       case "StudentModel":
//         account = await StudentModel.findById(decoded.id).select("-password");
//         break;

//       case "Teacher":
//         account = await Teacher.findById(decoded.id).select("-password");
//         break;

//       default:
//         return res.status(401).json({ error: "Invalid token model" });
//     }

//     if (!account) {
//       return res.status(401).json({ error: "Account not found" });
//     }

//     // ✅ Add className & section for teachers
//     req.user = {
//       id: account._id.toString(),
//       role: decoded.role,
//       model: decoded.model,
//       schoolId: decoded.schoolId,
//       ...(decoded.model === "Teacher" && {
//         className: account.className,
//         section: account.section,
//       }),
//     };

//     next();
//   } catch (err) {
//     console.error("Auth error:", err);
//     res.status(401).json({ error: "Not authorized" });
//   }
// };

// export default authMiddleware;
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import StudentModel from "../models/StudentModel.js";
import Teacher from "../models/Teacher.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || req.cookies?.jwt;

    if (!token) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let account;

    switch (decoded.model) {
      case "User":
        account = await User.findById(decoded.id).select("-password");
        break;

      case "Student":
      case "StudentModel":
        account = await StudentModel.findById(decoded.id).select("-password");
        break;

      case "Teacher":
        account = await Teacher.findById(decoded.id).select("-password");
        break;

      default:
        return res.status(401).json({ error: "Invalid token model" });
    }

    if (!account) {
      return res.status(401).json({ error: "Account not found" });
    }

    // Attach user to request
    req.user = {
      id: account._id.toString(),
      role: decoded.role,
      model: decoded.model,

      ...(decoded.model === "Student" && {
        schoolId: decoded.schoolId,
      }),
      ...(decoded.model === "Teacher" &&
        decoded.role == "SchoolAdmin" && {
          schoolId: decoded.schoolId,
        }),
      ...(decoded.model === "Teacher" &&
        decoded.role !== "SchoolAdmin" && {
          schoolId: decoded.schoolId,
          className: account.className,
          section: account.section,
        }),
    };

    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(401).json({ error: "Not authorized" });
  }
};

export default authMiddleware;
