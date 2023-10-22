const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWTSecret.toString(),
};

passport.use(
  new JWTStrategy(opts, async function (jwtPayload, done) {
    try {
      const user = await User.findById(jwtPayload._id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      console.log("Error in JWT passport: " + err);
    }
  })
);

const User = require("../models/user");
