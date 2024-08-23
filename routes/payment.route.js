// payment.route.js
import express from 'express';
import Stripe from 'stripe';
import { verifyToken } from '../utils/verifyUser.js';

const stripe = new Stripe('sk_test_51O2SGFSCFHW1mYPpRKKZMtw3aShHTiCj5DZO7cjMFjbMW14ei75DsmF4oPMhY4f6zGDCH6tQyCFO3k9BY7xk60V700q1o4HUE3');
const router = express.Router();

// Endpoint to create a payment intent
router.post('/create-payment-intent', verifyToken, async (req, res) => {
  try {
    const { amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      // Add other necessary payment intent properties here
    });
    res.status(200).json(paymentIntent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;