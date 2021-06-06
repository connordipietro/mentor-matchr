const router = require('express').Router();
const passport = require('passport');

// /api/auth/status
router.get('/status', (req, res) =>
  req.user ? res.send(req.user) : res.sendStatus(401)
);

// /api/auth/google
router.get('/google', passport.authenticate('google'), () => {
  console.log('test');
});

// /api/auth/google/redirect
router.get('/google/redirect', passport.authenticate('google'), (_req, res) => {
  res.redirect(process.env.GOOGLE_REDIRECT);
});

router.get('/google/logout', (req, res) => {
  req.session = null;
  req.logout();
  /*   res.redirect('/'); */
});

module.exports = router;
