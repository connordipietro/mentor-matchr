const router = require('express').Router();
const Banner = require('../../database/models/banner');

// /api/admin/dashboard
router.get('/dashboard', (req, res) => {
  // For testing the admin dashboard, change env var to your account email
  if (req.user.email === process.env.ADMIN_USER) {
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

router.get('/banner', async (req, res) => {
  // Disasllows multiple banners to be scheduled right now
  const bannerInDB = await Banner.find();
  if (bannerInDB[0]) return res.send(bannerInDB[0]);
  // Send status 400 if no banner found in db;
  res.sendStatus(400);
});

module.exports = router;

router.post('/banner', async (req, res) => {
  const { expireTime, bannerMsg } = req.body;
  // Unrptoected route for testing, would need to verfiy admin
  const result = await Banner.create({
    expirationDate: expireTime,
    bannerMsg,
  });

  if (result) return res.send({ stauts: 200, msg: 'Success!' });

  // Send error on error
  res.sendStatus(404);
});
