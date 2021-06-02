const router = require("express").Router();

// -- /api/auth/

// check login status
router.get("/status", (req, res) => {
  res.send({ 
    status: 200, 
    message: "Status auth route"})
});

// auth with google
router.get("/google", (req, res) => {
  res.send({
    status: 200,
    message: "Google auth route"
  })
});

// auth with google redirect
router.get("/google/redirect", (req, res) => {
  res.send({
    status: 200,
    message: "Google auth route"
  })
});

module.exports = router;