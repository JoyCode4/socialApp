const User = require("../models/user");

// render user profile page
module.exports.profile = (req, res) => {
  return res.render("user_profile", {
    title: "User Profile",
  });
};

// render user sign In page or Login Page
module.exports.signUp = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_up", {
    title: "Social App | Sign Up",
  });
};

// render user Sign Up page
module.exports.signIn = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_in", {
    title: "Social App | Sign In",
  });
};

// get the sign up data
module.exports.create = async (req, res) => {
  console.log(req.body);
  try {
    if (req.body.password !== req.body.confirm_password) {
      return res.redirect("back");
    } else {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        const data = await User.create(req.body);
        return res.redirect("/users/sign-in");
      } else {
        return res.redirect("back");
      }
    }
  } catch (err) {
    console.log("Error Signing Up : " + err);
  }
};

// sign in and create a session for the user
module.exports.createSession = (req, res) => {
  return res.redirect("/");
};

module.exports.destroySession = (req, res) => {
  // req.logout((err)=>{
  //   if(err){
  //     console.log("Error in logout : "+err);
  //   }
  // });
  return res.redirect("/");
};
