const User = require("../models/user");

// render user profile page
module.exports.profile = async (req, res) => {
    try{
    if(!req.cookies.user_id){
        return res.redirect("/users/sign-in");
    }else{
        const user = await User.findById(req.cookies.user_id);
        if(user){
            return res.render("user_profile",{
                title:"User Profile",
                user:user
            })
        }
        res.redirect("/users/sign-in");
    }
}catch(err){
    console.log("Error Showing Profile : " + err);
}
};

// render user sign In page or Login Page
module.exports.signUp = (req, res) => {
  res.render("user_sign_up", {
    title: "Social App | Sign Up",
  });
};

// render user Sign Up page
module.exports.signIn = (req, res) => {
  res.render("user_sign_in", {
    title: "Social App | Sign In",
  });
};

// get the sign up data
module.exports.create = async (req, res) => {
  console.log(req.body);
  try {
    if (req.body.password !== req.body.confirm_password) {
      res.redirect("back");
    } else {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        const data = await User.create(req.body);
        return res.redirect("/users/sign-in");
      } else {
        res.redirect("back");
      }
    }
  } catch (err) {
    console.log("Error Signing Up : " + err);
  }
};

// sign in and create a session for the user
module.exports.createSession = async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findOne({ email: req.body.email });
    if(user){
        if(req.body.password != user.password){
            return res.redirect("back");
        }
        else{
            res.cookie("user_id",user.id);
            return res.redirect("/users/profile");
        }

    }else{
        return res.redirect("back");
    }
  } catch (err) {
    console.log("Error Signing In : " + err);
  }
};
