import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
if (!process.env.STRIPE_SECRET_KEY) {
  //console.error("ENV KEYS:", process.env);
  throw new Error("STRIPE_SECRET_KEY is missing");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default stripe;
