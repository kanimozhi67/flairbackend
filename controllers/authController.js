import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import StudentModel from "../models/StudentModel.js";
import School from "../models/Schools.js";
import Teacher from "../models/Teacher.js";


export const schoolAdminLogin = async (req, res) => {
  try {
    const { schoolId, email, password } = req.body;

    // 1. Validate input
    if (!schoolId || !email || !password) {
      return res.status(400).json({
        message: "schoolId, username and password are required",
      });
    }

    // 2. Find SchoolAdmin
      const admin = await Teacher.findOne({ email, school: schoolId , role: "SchoolAdmin",}).populate("school");
    
  
    if (!admin) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // 4. Generate JWT
    const token = jwt.sign(
      {
        id: admin._id,
         email:admin.email,
        role: admin.role,
        schoolId: admin.school,
        model:"Teacher"
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 5. Send response
    res.status(200).json({
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        email:admin.email,
        username: admin.username,
        role: admin.role,
        schoolId: admin.school,
         model:"Teacher"
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};


export const teacherLogin = async (req, res) => {
  try {
    const { email, password, schoolId } = req.body;

    if (!email || !password || !schoolId) {
      return res.status(400).json({ message: "Email, password, and school are required" });
    }

    // Find teacher in the specific school
    const teacher = await Teacher.findOne({ email, school: schoolId }).populate("school");
    if (!teacher) {
      return res.status(401).json({ message: "Invalid email, password, or school" });
    }

    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email, password, or school" });
    }

    // Generate JWT including className & section
    const token = jwt.sign(
      {
        id: teacher._id,
        role: teacher.role,
        model: "Teacher",
        schoolId: teacher.school._id,
        className: teacher.className,
        section: teacher.section,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      teacher: {
        id: teacher._id,
         model: "Teacher",
        username: teacher.username,
        email: teacher.email,
        role: teacher.role,
        school: teacher.school,
        className: teacher.className,
        section: teacher.section,
      },
    });
  } catch (error) {
    console.error("Teacher login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};



export async function forgotPassword(req, res) {
  const { email, newPassword } = req.body;

  try {
    // Validate input
    if (!email || !newPassword) {
      return res.status(400).json({ message: "Email and new password are required" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User with this email does not exist" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

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
    const emailExists = await User.findOne({ email });
    if (emailExists)
      return res.status(400).json({ message: "Email already exists" });

    // Hash password
    const hashed = await bcrypt.hash(password, 10);
const level="kindergarten";
    // Create new user
    const user = new User({
      username,
      email,
      password: hashed,
      level,
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

    let user = await User.findOne({ username });
    if(!user){
      const email=username;
         user = await User.findOne({ email });
    }
    if (!user) return res.status(400).json({ message: "Invalid username" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid password" });

    // Create JWT token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        level: user.level,
isPremiuim:user.isPremium,
        model: "User",
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
    const { schoolId, username, rollNo, className, section, level, password } =
      req.body;

    if (!schoolId || !username || !rollNo || !className || !section || !level) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await StudentModel.create({
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
    const student = await StudentModel.findOne({
      rollNo,
      school: schoolId,
    });

    if (!student) {
      return res
        .status(400)
        .json({ message: "Invalid roll number for this school" });
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
        // role: student.role,
        model: "StudentModel",
        role: "Student",
        level: student.level,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
res.cookie("jwt", token, {
  maxAge: 30 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "strict",
  secure: process.env.NODE_ENV !== "development",
});
// res.cookie("token", token, {
//   httpOnly: true,
//   secure: true,
//   sameSite: "none",
//   // path: "/",           // 🔥 REQUIRED
//   maxAge: 7 * 24 * 60 * 60 * 1000,
// });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: student._id,
        rollNo: student.rollNo,
        className: student.className,
        section: student.section,
        school: school.name,
        level: student.level,
      },
    });
  } catch (err) {
    console.error("Student login error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

export const logout = async (req, res) => {
  try {
     res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",})
     res.cookie("jwt", "", { maxAge: 0 });
     res.status(200).json({ message: "logout successfuly" });
  } catch (err) {
    console.log(`error in logout controller: ${err}`);
    return res.status(500).json({ err: "Internal server error" });
  }
};

// export const getMe = async (req, res) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     let user;

//     if (decoded.model === "User") {
//       user = await User.findById(decoded.id).select("-password");
//     } else if (decoded.model === "StudentModel") {
//       user = await StudentModel.findById(decoded.id).select("-password");
//     }
//      else if (decoded.model === "Teacher") {
//       user = await Teacher.findById(decoded.id).select("-password");
//     }

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json(user);
//     console.log(JSON.stringify(user))
//   } catch (err) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

export const getMe = async (req, res) => {
  try {
    const token =
      req.headers.authorization?.split(" ")[1] || req.cookies?.jwt;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let user;

    if (decoded.model === "User") {
      user = await User.findById(decoded.id).select("-password");
    } else if (decoded.model === "StudentModel") {
      user = await StudentModel.findById(decoded.id).select("-password");
    } else if (decoded.model === "Teacher") {
      user = await Teacher.findById(decoded.id).select("-password");
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    res.status(401).json({ message: "Invalid token" });
  }
};
