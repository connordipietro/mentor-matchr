const router = require('express').Router();
const authRoutes = require('./auth/auth');
const paymentRoutes = require('./payment/payment');
const subscriptionRoutes = require('./subscriptions/subscriptions');

router.use('/auth', authRoutes);
router.use('/payment', paymentRoutes);
router.use('/subscriptions', subscriptionRoutes);

module.exports = router;
