const router = require('express').Router();

const user = require('../../database/models/user');
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

    const update = await user.findOneAndUpdate(
      { email: req.user.email },
      {
        $set: { 'customer.defaultPaymentId': result.id },
      },
      {
        new: true,
      }
    );

    return res.send(update);
  }
  return res.sendStatus(401);
});

module.exports = router;
