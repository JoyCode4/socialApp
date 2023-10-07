// render user profile page
module.exports.profile = (req,res)=>{
    res.render("user_profile",{
        title:"User Profile"
    });
}

// render user sign In page or Login Page
module.exports.signUp = (req,res)=>{
    res.render("user_sign_up",{
        title:"Social App | Sign Up"
    })
}

// render user Sign Up page
module.exports.signIn = (req,res)=>{
    res.render("user_sign_in",{
        title:"Social App | Sign In"
    })
}

// get the sign up data
module.exports.create = (req,res)=>{
    console.log(req.body);
}

// sign in and create a session for the user
module.exports.createSession = (req,res)=>{
    console.log(req.body);
}

