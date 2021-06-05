const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');

passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOLE_CALLBACK_URI,
      scope: ['email', 'profile'],
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
    }
  )
);
