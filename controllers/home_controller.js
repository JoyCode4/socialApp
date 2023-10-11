const Post = require("../models/post");
module.exports.home = async (req, res) => {
  // console.log(req.cookies); //getting cookie with name or key
  // res.cookie("user_id",55); //setting cookie

  // populate the user of each post
  const posts = await Post.find({})
    .populate("user")
    .populate({
      path: "comment",
      populate: { path: "user" },
    })
    .exec();
  return res.render("home", {
    title: "Social Media App",
    posts: posts,
  });
};
