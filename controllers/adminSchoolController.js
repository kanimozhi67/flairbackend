import School from "../models/Schools.js";
import Teacher from "../models/Teacher.js";

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
    const schools = await School.find().populate("teachers", "username email");
    res.status(200).json(schools);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch schools", error: err.message });
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

// Create teacher for a school
export const createTeacher = async (req, res) => {
  try {
    const { schoolId, username, email, password } = req.body;
    const teacher = await Teacher.create({ school: schoolId, username, email, password });
    // Add teacher to school's teachers array
    await School.findByIdAndUpdate(schoolId, { $push: { teachers: teacher._id } });
    res.status(201).json({ message: "Teacher added", teacher });
  } catch (err) {
    res.status(500).json({ message: "Failed to add teacher", error: err.message });
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
