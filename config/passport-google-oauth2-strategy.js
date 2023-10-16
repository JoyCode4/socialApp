const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");

passport.use(
  new googleStrategy(
    {
      clientID:
        "937479582412-mefeoo1l2ocrrv9l9k652kg4l3h72o7i.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8000/users/auth/google/callback",
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
