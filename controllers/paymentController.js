// controllers/paymentController.js
import stripe from "../utils/stripe.js";
import Payment from "../models/Payment.js";
// controllers/paymentWebhook.js
import User from "../models/User.js";


export const createCheckoutSession = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/payment-success`,
      cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
      metadata: {
        userId: req.user.id,
      },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ message: "Payment failed" });
  }
};


export const stripeWebhook = async (req, res) => {
   console.log("🔥 Webhook received");
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
     console.error("❌ Webhook signature error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
    
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = session.metadata.userId;

    await User.findByIdAndUpdate(userId, {
      isPremium: true,
      subscription: {
        plan: "monthly",
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
      stripeCustomerId: session.customer,
    });
  }
console.log("✅ Checkout completed for user:", session.metadata.userId);

  if (event.type === "customer.subscription.deleted") {
    await User.findOneAndUpdate(
      { stripeCustomerId: event.data.object.customer },
      {
        isPremium: false,
        "subscription.plan": null,
        "subscription.expiresAt": null,
      }
    );
  }

  res.json({ received: true });
};


//  export const paymentIntent = await stripe.paymentIntents.create({
//   amount,
//   currency: "usd",
//   payment_method_types: ["card"], // 👈 only card
// });


// export const createPaymentIntent = async (req, res) => {
//   try {
//     const { amount } = req.body;
//     const userId = req.user.id; // from auth middleware

//     // 🔒 validate price in backend
//     if (amount !== 5000) {
//       return res.status(400).json({ message: "Invalid amount" });
//     }

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency: "usd",
//       automatic_payment_methods: { enabled: true },
//     });

//     await Payment.create({
//       userId,
//       amount,
//       paymentIntentId: paymentIntent.id,
//     });

//     res.json({ clientSecret: paymentIntent.client_secret });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Payment failed" });
//   }
// };



// export const handleStripeWebhook = async (req, res) => {
//   const event = req.body;

//   if (event.type === "payment_intent.succeeded") {
//     const intent = event.data.object;

//     const payment = await Payment.findOne({
//       paymentIntentId: intent.id,
//     });

//     if (payment) {
//       payment.status = "success";
//       await payment.save();

//       // 🔥 Upgrade user
//       await User.findByIdAndUpdate(payment.userId, {
//         isPremium: true,
//          "subscription.plan": "yearly",
//           "subscription.expiresAt": new Date(
//           Date.now() + 30 * 24 * 60 * 60 * 1000 // 30 days
//         ),
//       });
//     }
//   }

//   res.json({ received: true });
// };

// export const activatePremium = async (req, res) => {
//   try {
//     const { userId, plan } = req.body;

//     const expiresAt =
//       plan === "monthly"
//         ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
//         : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

//     await User.findByIdAndUpdate(userId, {
//       isPremium: true,
//       "subscription.plan": plan,
//       "subscription.expiresAt": expiresAt,
//     });

//     res.json({ message: "Premium activated" });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to activate premium" });
//   }
// };
// export const updateUserPaymentStatus = async (req, res) => {
//   const { id } = req.params;
//   const { isPremium } = req.body;

//   await User.findByIdAndUpdate(id, { isPremium });

//   res.json({ message: "User updated" });
// };
// // await api.put(`/admin/update-user-payment/${userId}`, {
// //   isPremium: true
// // });


