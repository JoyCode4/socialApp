const User = require("../models/user");
const fs = require("fs");
const path = require("path");

// render user profile page
module.exports.profile = async (req, res) => {
  const user_profile = await User.findById(req.params.id);
  return res.render("user_profile", {
    title: "User Profile",
    user_profile,
  });
};

module.exports.update = async (req, res) => {
  try {
    if (req.user.id == req.params.id) {
      const user = await User.findById(req.params.id);
      console.log(user);
      await User.uploadAvatar(req, res, function (err) {
        if (err) {
          console.log("Multer Error: " + err);
        }

        user.name = req.body.name;
        user.email = req.body.email;

        if (req.file) {
          if (user.avatar) {
            fs.unlinkSync(path.join(__dirname, "..", user.avatar));
          }

          // this saves the path of the file path into userSchema
          user.avatar = User.avatarPath + "/" + req.file.filename;
        }

        user.save();
      });
      req.flash("success", "User data is Updated Successfully!");
      return res.redirect("back");
    }
  } catch (err) {
    req.flash("error", "Error while updating user");
    console.log("Error while Updating User Details: " + err);
  }
};

// render user Sign Up page
module.exports.signUp = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

  return res.render("user_sign_up", {
    title: "Social App | Sign Up",
  });
};

// render user sign In page or Login Page
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
        req.flash("success", "Registered Successfully!");
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
  req.flash("success", "Logged Successfully!");
  return res.redirect("/");
};

module.exports.destroySession = (req, res) => {
  // req.logout((err)=>{
  //   if(err){
  //     console.log("Error in logout : "+err);
  //   }
  // });
  req.flash("success", "Logout Successfully!");
  return res.redirect("/users/sign-in");
};
