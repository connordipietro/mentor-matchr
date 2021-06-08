const router = require('express').Router();

const { associatePaymentMethod } = require('../../utilities/stripe');

// /api/payment/
router.get('/', (req, res) => {
  res.send({
    status: 200,
    message: 'test',
  });
});

router.post('/methods/create', async (req, res) => {
  if (req.user) {
    const { id } = req.body;
    if (!id) return res.sendStatus(400);
    const { customer } = req.user;
    const result = await associatePaymentMethod({
      customer: customer.stripeId,
      id,
    });
    console.log(result);
    return res.sendStatus(200);
  }
  return res.sendStatus(401);
});

module.exports = router;
