const router = require('express').Router();
const { createSubscription } = require('../../utilities/stripe');

// /api/subscriptions/
router.post('/new', async (req, res) => {
  const { priceId } = req.body;
  if (req.user) {
    const { id } = req.user;
    if (!id) return res.sendStatus(400);

    const response = await createSubscription({
      customer: req.user.customer.stripeId,
      payment: req.user.customer.defaultPaymentId,
      price: priceId,
    });
    return res.send(response);
  }
  return res.sendStatus(401);
});

module.exports = router;
