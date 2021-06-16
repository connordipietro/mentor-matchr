/* eslint-disable no-restricted-syntax */
const user = require('../database/models/user');

// Series of aync filters...
// If mentor makes request, mentees are returned, and vice versa
const mentorMenteeFilter = async (matches, mentorMentee) => {
  const filterByMentorMentee = matches.filter(
    (doc) =>
      doc.settings.mentorMentee.mentorMentee !== mentorMentee.mentorMentee
  );
  return filterByMentorMentee;
};

// filters for users with one matching day of availibility
const dayAvailibilityFilter = async (matches, days) => {
  const foundDayMatches = [];
  matches.filter((doc) => {
    for (const prop in days) {
      if (days[prop] && doc.settings.days[prop]) {
        foundDayMatches.push(doc);
      }
    }
    return foundDayMatches;
  });
  const uniqueDayMatches = [...new Set(foundDayMatches)];
  return uniqueDayMatches;
};

// filters for users with one matching time preference of availibility
const timeAvailibilityFilter = async (matches, time) => {
  const foundTimeMatches = [];
  matches.filter((doc) => {
    for (const prop in time) {
      if (time[prop] && doc.settings.time[prop]) {
        foundTimeMatches.push(doc);
      }
    }
    return foundTimeMatches;
  });

  const uniqueTimeMatches = [...new Set(foundTimeMatches)];
  return uniqueTimeMatches;
};

// filteres for users with one matching interest
const interestFilter = async (matches, interests) => {
  const foundInterestMatches = [];
  matches.filter((doc) => {
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
  // Creates unique set of users that match all user preferences
  const uniqueInterestMatches = [...new Set(foundInterestMatches)];
  return uniqueInterestMatches;
};

// Async calls all helper filters above and returns final result
const matchFinder = async (requestineUser) => {
  const { mentorMentee, days, time, interests } = requestineUser.settings;
  const allUsers = await user.find({});
  const filteredByMentorMentee = await mentorMenteeFilter(
    allUsers,
    mentorMentee
  );

  const filteredByDayAvailibility = await dayAvailibilityFilter(
    filteredByMentorMentee,
    days
  );

  const filteredByTimeAvailibility = await timeAvailibilityFilter(
    filteredByDayAvailibility,
    time
  );

  const filteredByInterest = await interestFilter(
    filteredByTimeAvailibility,
    interests
  );

  return filteredByInterest;
};

module.exports = { matchFinder };
