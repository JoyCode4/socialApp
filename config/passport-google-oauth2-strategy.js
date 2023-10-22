const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");

passport.use(
  new googleStrategy(
    {
      clientID: process.env.clientID.toString(),
      clientSecret: process.env.clientSecret.toString(),
      callbackURL: process.env.callbackURL.toString(),
    },

    async function (accessToken, refreshToken, profile, done) {
      try {
        const user = await User.findOne({
          email: profile.emails[0].value,
        }).exec();
        if (user) {
          return done(null, user);
        } else {
          const newUser = await User.create({
            email: profile.emails[0].value,
            name: profile.displayName,
            password: crypto.randomBytes(20).toString("hex"),
          });

          return done(null, newUser);
        }
      } catch (err) {
        console.log("Error in Google Auth: " + err);
      }
    }
  )
);

module.exports = passport;
