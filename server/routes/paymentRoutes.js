const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

require('dotenv').config();

router.post('/create-checkout-session', async (req, res) => {
  const { cartItems } = req.body;

  try {
    const line_items = cartItems.map(item => ({
      price_data: {
        currency: 'gbp',
        product_data: {
          name: item.name,
          images: [item.imageUrl],
        },
        unit_amount: Math.round(item.price * 100), // convert £ to pence
      },
      quantity: Math.max(1, Math.round(item.squareFeet)), // convert square feet to quantity
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: 'http://localhost:3000/checkout-success',
      cancel_url: 'http://localhost:3000/checkout',
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error('Stripe error:', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;