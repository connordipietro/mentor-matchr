const router = require('express').Router();
const user = require('../../database/models/user');

// /api/user/account/create
router.post('/account/create', async (req, res) => {
  if (req.user) {
    const { id } = req.user;
    if (!id) return res.sendStatus(400);
    const { mentorMentee, days, time, userAvatar, userInterests, userBio } =
      req.body;

    const update = await user.findOneAndUpdate(
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

    console.log(update);

    return res.sendStatus(200);
  }
  return res.sendStatus(401);
});

module.exports = router;
