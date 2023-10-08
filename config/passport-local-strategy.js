const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

// Authentication using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        // Find a user and establish the identity
        const user = await User.findOne({ email: email });
        if (!user || user.password != password) {
          console.log("Invalid Username/Password");
          return done(null, false);
        }
        return done(null, user);
      } catch (err) {
        console.log("Error in finding User --> Passport");
        return done(err);
      }
    }
  )
);

// adding the encrypted user.id to the cookie  --> serialize
passport.serializeUser((user, done) => {
  return done(null, user.id);
});

// sending the encrypted cookie to the server and checking the user --> deserialize
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    return done(null, user);
  } catch (err) {
    console.log("Error in finding User --> Passport");
    return done(err);
  }
});

// check if the user is authenticated
passport.checkAuthentication = (req,res,next)=>{
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect("/users/sign-in");
}

passport.setAuthenticatedUser = (req,res,next)=>{
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    return next();
}

passport.setLogout=(req,res,next)=>{
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/users/sign-in');
  });
}

module.exports = passport;
