const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');
const User = require('../database/models/user');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const userInDB = await User.findOne({ id });
    return userInDB ? done(null, userInDB) : done(null, null);
  } catch (err) {
    console.log(err);
    return done(err, null);
  }
});

passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URI,
      scope: ['email', 'profile'],
    },
    async (accessToken, refreshToken, profile, done) => {
      const { email, sub } = profile._json;
      try {
        const userInDB = await User.findOne({ id: sub });
        if (!userInDB) {
          console.log('User not found');
          const newUser = await User.create({ email, id: sub });
          return done(null, newUser);
        }
        console.log('Found user');
        return done(null, userInDB);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
