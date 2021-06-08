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
    res.send(response);
  } else res.send({ status: 401 });
});

module.exports = router;
