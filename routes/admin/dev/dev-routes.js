const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const User = require('../../../database/models/user');

// /api/dev/data
router.get('/data', async (req, res) => {
  const newUser = await User.create({
    email: 'test3@mentee.com',
    id: uuidv4(),
    name: 'Test Mentee 3',
    settings: {
      avatar: [],
      interests: [{ key: 2, label: 'Polymer' }],
      bio: 'Test mentee 3. I have a few interests and limited availibility',
      days: {
        monday: true,
        tuesday: true,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: true,
        sunday: false,
      },
      mentorMentee: { mentorMentee: 'mentee' },
      time: { morning: true, afternoon: false, evening: true },
    },
  });
  res.send(newUser);
});

module.exports = router;
