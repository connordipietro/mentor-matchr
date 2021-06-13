const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const User = require('../../../database/models/user');

// /api/dev/data
router.get('/data', async (req, res) => {
  const newUser = await User.create({
    email: 'test2@mentee.com',
    id: uuidv4(),
    settings: {
      avatar: [],
      interests: [
        { key: 0, label: 'Angular' },
        { key: 1, label: 'jQuery' },
        { key: 2, label: 'Polymer' },
      ],
      bio: 'Test mentee 2. I have a few interests and limited availibility',
      days: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      },
      mentorMentee: { mentorMentee: 'mentee' },
      time: { morning: true, afternoon: false, evening: false },
    },
  });
  res.send(newUser);
});

module.exports = router;
