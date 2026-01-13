 import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();
if (!process.env.STRIPE_SECRET_KEY) {
  //console.error("ENV KEYS:", process.env);
  throw new Error("STRIPE_SECRET_KEY is missing");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default stripe;
// import Stripe from "stripe";

// let stripe;

// export function getStripe() {
//   if (!process.env.STRIPE_SECRET_KEY) {
//     throw new Error("STRIPE_SECRET_KEY is missing");
//   }

//   if (!stripe) {
//     stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
//   }

//   return stripe;
// }
// export default stripe;