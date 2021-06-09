const router = require('express').Router();
const authRoutes = require('./auth/auth');
const paymentRoutes = require('./payment/payment');
const subscriptionRoutes = require('./subscriptions/subscriptions');
const adminRoutes = require('./admin/admin');

router.use('/auth', authRoutes);
router.use('/payment', paymentRoutes);
router.use('/subscriptions', subscriptionRoutes);
router.use('/admin', adminRoutes);

module.exports = router;
