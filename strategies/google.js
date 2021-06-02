const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');

passport.use(
  new Strategy(
    {
      clientID: '',
      clientSecret: '',
      callbackURL: '',
      scope: [],
    },
    (accessToken, refreshToken, profile, done) => {}
  )
);
