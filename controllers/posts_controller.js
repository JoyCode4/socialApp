const Post = require("../models/post");

module.exports.create=async (req,res)=>{
    console.log(req.user);
    console.log(req.body);
    if(!req.user){
        return res.redirect("/users/sign-in");
    }
    else{
        const post = await Post.create({
            content:req.body.content,
            user:req.user._id
        })
        console.log(post);
        return res.redirect("back");
    }
}