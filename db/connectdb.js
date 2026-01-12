import mongoose from "mongoose";
import User from "../models/User.js";
import stripe from "../utils/stripe.js";
// Connect MongoDB
const connectdb = async() => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected");
// PRODUCT ID: prod_TmBAYJMmF3UmLp
// PRICE ID: price_1SocnuPKeiF8APQ1UaPnCNaB
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

// const product = await stripe.products.create({
//   name: "Premium Plan",
// });

// const price = await stripe.prices.create({
//   unit_amount: 5000, // $50.00
//   currency: "usd",
//   recurring: { interval: "month" },
//   product: product.id,
// });
// const result = await User.updateMany(
//   {
//     isPremium: { $exists: false },
//   },
//   {
//     $set: {
//       isPremium: false,
//       stripeCustomerId: null,
//       subscription: {
//         plan: null,
//         expiresAt: null,
//       },
//     },
//   }
// );

// console.log("Users updated:", result.modifiedCount);

  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
export default connectdb;
