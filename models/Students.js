import mongoose from "mongoose";

const studentsSchema = new mongoose.Schema(
  {
    school:{
type:  mongoose.Schema.Types.ObjectId,
ref: "School",
  required: true,
    },
    username: {
      type: String,
      required: true,
    //  unique: true,
    },
    email: {
      type: String,
    // required: true,
      unique: true,
    },
    avatar: {
      type: String,
      default: "/img/rabbitAvatar.png",
    },
    sticker: {
      type: [String],
      default: [],
    },
    password: {
      type: String,
      required: true,
    }, 
    //rollNo only for students
    rollNo: {
      type: String,
        unique: true,
        //default:"70"
      required: true,
    },
    className: {
      type: String,
      default:"App Class"
    },
    section: {
      type: String,
      default: "App Section",
    },
    level: {
      type: String,
      //   enum: ["kindergarten", "primary"],
      // required: true,
    
    },

    // 🔐 ADD THIS
    role: {
      type: String,
      enum: [ "Admin","Student"],
      default: "Student",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Students", studentsSchema);
