const router = require('express').Router();
const user = require('../../database/models/user');
const { matchFinder } = require('../../utilities/matches');

// /api/user/matches
router.get('/matches', async (req, res) => {
  if (req.user) {
    const { id } = req.user;

    if (!id) return res.sendStatus(400);

    const matches = await matchFinder(req.user);

    // Removes info FE doesn't need to know about users
    const results = matches.map((match) => ({
      email: match.email,
      settings: match.settings,
      name: match.name,
    }));

    return res.send({ status: 200, matches: results });
  }
  return res.sendStatus(401);
});

// Accepts an email in the post body and gets user profile info for that email.
// /api/user/profile
router.post('/profile', async (req, res) => {
  if (req.user) {
    const { id } = req.user;
    const { email } = req.body;
    let queryEmail;

    if (!id) return res.sendStatus(400);

    if (email === 'user') {
      queryEmail = req.user.email;
    } else {
      queryEmail = email;
    }

    const profileInfo = await user.find({ email: queryEmail });

    return res.send({
      status: 200,
      email: profileInfo[0].email,
      settings: profileInfo[0].settings,
      name: profileInfo[0].name,
    });
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
