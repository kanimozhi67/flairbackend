// controllers/subscriptionController.js
import stripe from "../utils/stripe.js";
import User from "../models/User.js";

export const createSubscription = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    let customerId = user.stripeCustomerId;

    // Create customer once
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.username,
      });

      customerId = customer.id;
      user.stripeCustomerId = customerId;
      await user.save();
    }

    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: process.env.STRIPE_PRICE_ID }],
      payment_behavior: "default_incomplete",
      expand: ["latest_invoice.payment_intent"],
    });

    res.json({
      clientSecret:
        subscription.latest_invoice.payment_intent.client_secret,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Subscription failed" });
  }
};
