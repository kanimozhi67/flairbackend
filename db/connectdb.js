import mongoose from "mongoose";
import User from "../models/User.js";
// Connect MongoDB
const connectdb = async() => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected");




  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
export default connectdb;
