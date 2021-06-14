const router = require('express').Router();
const user = require('../../database/models/user');
const { matchFinder } = require('../../utilities/matches');

// /api/user/matches
router.get('/matches', async (req, res) => {
  if (req.user) {
    const { id } = req.user;

    if (!id) return res.sendStatus(400);

    const matches = await matchFinder(req.user);

    return res.send({ status: 200, data: matches });
  }
  return res.sendStatus(401);
});

// /api/user/account/create
router.post('/account/create', async (req, res) => {
  if (req.user) {
    const { id } = req.user;
    if (!id) return res.sendStatus(400);
    const { mentorMentee, days, time, userAvatar, userInterests, userBio } =
      req.body;

    await user.findOneAndUpdate(
      { email: req.user.email },
      {
        $set: {
          'settings.mentorMentee': mentorMentee,
          'settings.days': days,
          'settings.time': time,
          'settings.avatar': userAvatar,
          'settings.interests': userInterests,
          'settings.bio': userBio,
        },
      },
      {
        new: true,
      }
    );

    return res.sendStatus(200);
  }
  return res.sendStatus(401);
});

module.exports = router;
