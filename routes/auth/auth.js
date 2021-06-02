const router = require("express").Router();

// /api/auth/status
router.get("/status", (req, res) => {
  res.send({ 
    status: 200, 
    message: "Status auth route"})
});

// /api/auth/google
router.get("/google", (req, res) => {
  res.send({
    status: 200,
    message: "Google auth route"
  })
});

// api/auth/google/redirect
router.get("/google/redirect", (req, res) => {
  res.send({
    status: 200,
    message: "Google redirect route"
  })
});

module.exports = router;