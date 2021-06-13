const router = require('express').Router();
const passport = require('passport');

// /api/auth/status
router.get('/status', async (req, res) =>
  req.user ? res.send(req.user) : res.sendStatus(401)
);

// /api/auth/google
router.get('/google', passport.authenticate('google'), () => {
  console.log('test');
});

// /api/auth/google/redirect
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  if (!req.user.settings) {
    return res.redirect(process.env.CREATE_ACCOUNT);
  }
  res.redirect(process.env.EXISTING_USER);
});

router.get('/google/logout', (req, res) => {
  req.session.destroy(() => {
    req.logout();
    res.clearCookie('connect.sid');
  });
});

module.exports = router;
