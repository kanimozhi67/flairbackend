import mongoose from "mongoose";
// Connect MongoDB
const connectdb = async() => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected");
    console.log("MONGO_URL ->", process.env.MONGO_URL);
console.log("DB Ready:", mongoose.connection.readyState);

  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
export default connectdb;
