import mongoose from "mongoose";
import User from "../models/User.js";
// Connect MongoDB
const connectdb = async() => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected");

//const email = "kaniboopathi93@gmail.com";
// const level = "kindergarden";

// const user = await User.findAndUpdate(
//   { level },
//   { level: "kindergarten" });
 
// await User.updateMany(
//   { level: "kindergarden" },
//   { $set: { level: "kindergarten" } }
// );


  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
export default connectdb;
