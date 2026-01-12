import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const run = async () => {
  const product = await stripe.products.create({
    name: "Premium Plan",
  });

  const price = await stripe.prices.create({
    unit_amount: 5000, // $50
    currency: "usd",
    recurring: { interval: "month" },
    product: product.id,
  });

  console.log("PRODUCT ID:", product.id);
  console.log("PRICE ID:", price.id);
};

run();
