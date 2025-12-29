import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Students from "../models/Students.js";
import School from "../models/Schools.js";
// export async function signup(req, res) {
//   const { username, email, password, level } = req.body;

//   try {
//     if (!level || !["kindergarden", "primary"].includes(level)) {
//       return res.status(400).json({ message: "Invalid level" });
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!email || !emailRegex.test(email)) {
//       return res.status(400).json({ err: "Invalid email format" });
//     }

//     const userExists = await User.findOne({ username });
//     if (userExists)
//       return res.status(400).json({ message: "Username already exists" });

//     const hashed = await bcrypt.hash(password, 10);

//     const user = new User({
//       username,
//       email,
//       password: hashed,
//       level, // ✅ SAVED
//     });

//     await user.save();

//     res.json({ message: "Signup successful" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// }


// export async function login(req, res) {
//   if (req.method !== "POST")
//     return res.status(405).json({ error: "Method not allowed" });

//   try {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username });
//     if (!user) return res.status(400).json({ message: "Invalid login" });

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) return res.status(400).json({ message: "Invalid login" });

//     const token = jwt.sign(
//       {
//         id: user._id,
//         role: user.role,
//         level: user.level, // ✅ THIS FIXES EVERYTHING
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.cookie("jwt", token, {
//       maxAge: 1 * 24 * 60 * 60 * 1000,
//       httpOnly: true,
//       sameSite: "strict",
//       secure: process.env.NODE_ENV !== "development",
//     });

//     res.json({
//       message: "Login successful",
//       token,
//       user: {
//         id: user._id,
//         username: user.username,
//         email: user.email,
//         level: user.level, // optional for frontend
//       },
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// }


export async function signup(req, res) {
  const { username, email, password } = req.body;

  try {
  
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ err: "Invalid email format" });
    }


    // Check if username already exists
    const userExists = await User.findOne({ username });
    if (userExists)
      return res.status(400).json({ message: "Username already exists" });

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      username,
      email,
      password: hashed,
      level,
      rollNo,
      className,
      section,
    });

    await user.save();

    res.json({ message: "Signup successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function login(req, res) { 
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid username" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid password" });

    // Create JWT token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        level: user.level,
        rollNo: user.rollNo,
        className: user.className,
        section: user.section,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("jwt", token, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        level: user.level,
        rollNo: user.rollNo,
        className: user.className,
        section: user.section,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/**
 * POST /auth/studentSignup
 * Registers a new student with school association
 */
export async function studentSignup(req, res) {
  try {
    const { schoolId, username, rollNo, className, section, level, password } = req.body;

    if (!schoolId || !username || !rollNo || !className || !section || !level) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await Students.create({
      school: schoolId,
      username,
      rollNo,
      className,
      section,
      level,
      password: hashedPassword,
    //  email: `${rollNo}@school.com`,
      role: "Student",
    });
  await School.findByIdAndUpdate(
      schoolId,
      { $push: { students: student._id } },
      { new: true }
    );
    res.status(201).json({ message: "Student added", student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}


/**
 * POST /auth/studentLogin
 * Student login using rollNo + schoolId
 */


export async function studentLogin(req, res) {
  const { rollNo, password, schoolId } = req.body;

  if (!rollNo || !password || !schoolId) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    // 1️⃣ Validate school exists
    const school = await School.findById(schoolId);
    if (!school) {
      return res.status(400).json({ message: "School not found" });
    }

    // 2️⃣ Find student under that school
    const student = await Students.findOne({
      rollNo,
      school: schoolId,
    });

    if (!student) {
      return res.status(400).json({ message: "Invalid roll number for this school" });
    }

    // 3️⃣ Password check
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // 4️⃣ JWT
    const token = jwt.sign(
      {
        id: student._id,
        role: student.role,
        school: student.school,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: student._id,
        rollNo: student.rollNo,
        className: student.className,
        section: student.section,
        school: school.name,
      },
    });
  } catch (err) {
    console.error("Student login error:", err);
    res.status(500).json({ message: "Server error" });
  }
}



export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "logout successfuly" });
  } catch (err) {
    console.log(`error in logout controller: ${err}`);
    return res.status(500).json({ err: "Internal server error" });
  }
};
// GET /auth/me
export const getMe = async (req, res) => {
  try {
    // Expect token in headers: Authorization: Bearer <token>
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password"); // exclude password
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
