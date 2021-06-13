const router = require('express').Router();
const user = require('../../database/models/user');

// /api/user/matches
/* router.get('/matches', async (req, res) => {
  if (req.user) {
    const { id } = req.user;
      console.log(req.user); 
    if (!id) return res.sendStatus(400);
    const { mentorMentee, days, time, userInterests } = req.user.settings;

     console.log(mentorMentee, days, time, userInterests);
    console.log(mentorMentee.mentorMentee); 

       const matches = await user
      .find({ settings: { mentorMentee: !mentorMentee } })
      .exec(); 

    user.find({}, function (err, docs) {
       console.log(docs);
      const allUserSettings = docs.map((doc) => doc.settings);
      console.log(allUserSettings); 
      const filterByMentorMentee = allUserSettings.filter(
        (doc) => doc.mentorMentee.mentorMentee !== mentorMentee.mentorMentee
      );
      // console.log(filterByMentorMentee);

      const filterByTime = filterByMentorMentee.filter(
        (doc) => doc.time.morning === days.time.morning
      );
      console.log(filterByTime);
    });
 
    return res.sendStatus(200);
  }
  return res.sendStatus(401);
});
 */
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
