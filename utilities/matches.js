/* eslint-disable no-restricted-syntax */
const user = require('../database/models/user');

const matchFinder = async (requestineUser) => {
  const { mentorMentee, days, time, interests } = requestineUser.settings;
  const matches = [];
  await user.find({}, function (err, docs) {
    // Filter users by mentors or mentees given requesting user status
    const filterByMentorMentee = docs.filter(
      (doc) =>
        doc.settings.mentorMentee.mentorMentee !== mentorMentee.mentorMentee
    );

    // Filter by day availibility
    const foundDayMatches = [];
    filterByMentorMentee.filter((doc) => {
      for (const prop in days) {
        if (days[prop] && doc.settings.days[prop]) {
          foundDayMatches.push(doc);
        }
      }
      return foundDayMatches;
    });
    const uniqueDayMatches = [...new Set(foundDayMatches)];

    // Filter by time availibility
    const foundTimeMatches = [];
    uniqueDayMatches.filter((doc) => {
      for (const prop in time) {
        if (time[prop] && doc.settings.time[prop]) {
          foundTimeMatches.push(doc);
        }
      }
      return foundTimeMatches;
    });

    const uniqueTimeMatches = [...new Set(foundTimeMatches)];

    const foundInterestMatches = [];
    uniqueTimeMatches.filter((doc) => {
      for (let i = 0; i < doc.settings.interests.length; i += 1) {
        for (let j = 0; j < interests.length; j += 1) {
          if (doc.settings.interests[i].label === interests[j].label) {
            // console.log('match');
            foundInterestMatches.push(doc);
          }
        }
      }

      return foundInterestMatches;
    });

    matches.push([...new Set(foundInterestMatches)]);
  });
  return matches;
};

module.exports = { matchFinder };
