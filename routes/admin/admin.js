const router = require('express').Router();

// /api/admin/dashboard
router.get('/dashboard', (req, res) => {
  // For testing the admin dashboard, change this line to your gmail
  if (req.user.email === 'connor.dipietro@gmail.com') {
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;
