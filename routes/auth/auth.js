const router = require('express').Router();
const passport = require('passport');

// /api/auth/status
router.get('/status', (req, res) => {
  res.send({
    user: req.user,
    sessionID: req.sessionID,
    status: 200,
    message: 'Status auth route',
  });
});

// /api/auth/google
router.get('/google', passport.authenticate('google'), () => {
  console.log('test');
});

// /api/auth/google/redirect
router.get('/google/redirect', passport.authenticate('google'), (_req, res) => {
  res.send({
    status: 200,
    message: 'Google redirect route',
  });
});

module.exports = router;
