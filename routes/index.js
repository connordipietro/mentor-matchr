const router = require('express').Router();
const authRoutes = require('./auth/auth');
const paymentRoutes = require('./payment/payment');
const subscriptionRoutes = require('./subscriptions/subscriptions');
const adminRoutes = require('./admin/admin');
const userRoutes = require('./user/user');
const devRoutes = require('./admin/dev/dev-routes');
const connectionRoutes = require('./user/connections');
const compileRoutes = require('./compiling/compile');

router.use('/auth', authRoutes);
router.use('/payment', paymentRoutes);
router.use('/subscriptions', subscriptionRoutes);
router.use('/admin', adminRoutes);
router.use('/user', userRoutes);
router.use('/user/connections/', connectionRoutes);
router.use('/dev', devRoutes);
router.use('/compile', compileRoutes);

module.exports = router;
