import School from "../models/Schools.js";
import Teacher from "../models/Teacher.js";
import StudentModel from "../models/StudentModel.js";
import bcrypt from "bcryptjs";
// ----------------- Schools -----------------

// Create a school
export const createSchool = async (req, res) => {
  try {
    const school = await School.create(req.body);
    res.status(201).json({ message: "School created", school });
  } catch (err) {
    res.status(500).json({ message: "Failed to create school", error: err.message });
  }
};

// Get all schools
export const getSchools = async (req, res) => {
  try {
    const schools = await School.find()
      .populate({
        path: "teachers",
        select: "username email role className section",
      })
      .populate({
        path: "students",
        select: "username rollNo role className section level",
      })
      .lean();

    res.status(200).json(schools);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch schools",
      error: err.message,
    });
  }
};

// Delete a school
export const deleteSchool = async (req, res) => {
  try {
    const { schoolId } = req.params;
    await Teacher.deleteMany({ school: schoolId }); // delete all teachers of this school
    await School.findByIdAndDelete(schoolId);
    res.json({ message: "School and its teachers deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete school", error: err.message });
  }
};

// ----------------- Teachers -----------------



export const createSchoolAdmin = async (req, res) => {
  try {
    const { schoolId, username, email, password} = req.body;

    // ✅ Basic validation
    if (!schoolId || !username || !email || !password ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create teacher
    const teacher = await Teacher.create({
      school: schoolId,
      username,
      email,
      password: hashedPassword,
     role:"SchoolAdmin"
    });

    // ✅ Add teacher to school's teachers array
    await School.findByIdAndUpdate(schoolId, { $push: { teachers: teacher._id } });

    res.status(201).json({ message: "SchoolAdmin added", teacher });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add School admin", error: err.message });
  }
};
export const createTeacher = async (req, res) => {
  try {
    const { schoolId, username, email, password, className, section } = req.body;

    // ✅ Basic validation
    if (!schoolId || !username || !email || !password || !className || !section) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create teacher
    const teacher = await Teacher.create({
      school: schoolId,
      username,
      email,
      password: hashedPassword,
      className,
      section,
    });

    // ✅ Add teacher to school's teachers array
    await School.findByIdAndUpdate(schoolId, { $push: { teachers: teacher._id } });

    res.status(201).json({ message: "Teacher added", teacher });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add teacher", error: err.message });
  }
};
// PUT /api/admin/teacher/:id
export const updateTeacher = async (req, res) => {
  try {
    const { username, email, className, section } = req.body;
    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id, // use teacherId, not id
      { username, email, className, section },
      { new: true }
    );
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });
    res.status(200).json({ message: "Teacher updated", teacher });
  } catch (err) {
    res.status(500).json({ message: "Failed to update teacher", error: err.message });
  }
};
export const updateStudent = async (req, res) => {
  try {
    const { username, rollNo, className, section, level } = req.body;
    const student = await StudentModel.findByIdAndUpdate(
      req.params.id, // use teacherId, not id
      { username, rollNo, className, section, level },
      { new: true }
    );
    if (!student) return res.status(404).json({ message: "student not found" });
    res.status(200).json({ message: "student updated", student });
  } catch (err) {
    res.status(500).json({ message: "Failed to update student", error: err.message });
  }
};



// Delete teacher
export const deleteTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const teacher = await Teacher.findByIdAndDelete(teacherId);
    if (teacher) {
      await School.findByIdAndUpdate(teacher.school, { $pull: { teachers: teacher._id } });
    }
    res.json({ message: "Teacher deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete teacher", error: err.message });
  }
};
export const deleteStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await StudentModel.findByIdAndDelete(studentId);
    if (student) {
      await School.findByIdAndUpdate(student.school, { $pull: { students: student._id } });
    }
    res.json({ message: "Student deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete student ", error: err.message });
  }
};
