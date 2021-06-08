const router = require('express').Router();
const { createSubscription } = require('../../utilities/stripe');

// /api/subscriptions/
router.post('/new', async (req, res) => {
  console.log(req.body);
  const { priceId } = req.body;
  // auth user

  const response = await createSubscription({
    customer: req.user.customer.stripeId,
    payment: req.user.customer.defaultPaymentId,
    price: priceId,
  });

  res.send(response);
});

module.exports = router;
