import mongoose from "mongoose";
import User from "../models/User.js";


// Connect MongoDB

 
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected");




const email = "kaniboopathi93@gmail.com";

const user = await User.findOneAndUpdate(
  { email },
  { role: "Admin" },
  { new: true }
);

console.log("Updated user:", user);

await mongoose.disconnect();
