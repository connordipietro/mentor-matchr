const router = require("express").Router();
const authRoutes = require('./auth/auth');
const paymentRoutes = require('./payment/payment');

router.use("/auth", authRoutes)
router.use("/payment", paymentRoutes)

module.exports = router;