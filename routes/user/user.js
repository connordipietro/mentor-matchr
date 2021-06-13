const router = require('express').Router();

// /api/user/account/create
router.post('/account/create', async (req, res) => {
  console.log(req.body);
  if (req.user) {
    console.log(req.user);
    const { id } = req.user;
    if (!id) return res.sendStatus(400);
    console.log('authed');
    return res.sendStatus(200);
  }
  return res.sendStatus(401);
});

module.exports = router;
