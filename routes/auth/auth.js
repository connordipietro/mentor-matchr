const router = require("express").Router();

// /api/auth/
router.get("/", (req, res) => {
  res.send({ 
    status: 200, 
    message: "test"})
});

module.exports = router;