const router = require('express').Router();
const authRoutes = require('./auth/auth');
const paymentRoutes = require('./payment/payment');
const subscriptionRoutes = require('./subscriptions/subscriptions');
const adminRoutes = require('./admin/admin');
const userRoutes = require('./user/user');

router.use('/auth', authRoutes);
router.use('/payment', paymentRoutes);
router.use('/subscriptions', subscriptionRoutes);
router.use('/admin', adminRoutes);
router.use('/user', userRoutes);

module.exports = router;
