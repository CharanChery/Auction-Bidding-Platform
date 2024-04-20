const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Define payment routes
router.post("/", async (req, res) => {
  try {
    // Extract payment details from the request body
    const { amount, currency, source, description } = req.body;

    // Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      source,
      description
    });

    // Send the client secret to the client
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error processing payment:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
