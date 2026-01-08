import mongoose from "mongoose";
import User from "../models/User.js";
// Connect MongoDB
const connectdb = async() => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected");

// const email = "anju@gmail.com";

// const user = await User.findOneAndUpdate(
//   { email },
//   { $set: { username: "Anjana" } },
//   { new: true } // returns the updated document
// );

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
