const router = require("express").Router();

// /api/payment/
router.get("/", (req, res) => {
  res.send({ 
    status: 200, 
    message: "test"})
});

module.exports = router;