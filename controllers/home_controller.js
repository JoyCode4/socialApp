const Post = require("../models/post");
const User = require("../models/user");
const Friendship = require("../models/friendship");

module.exports.home = async (req, res) => {
  try {
    // console.log(req.cookies); //getting cookie with name or key
    // res.cookie("user_id",55); //setting cookie

    // populate the user of each post
    const posts = await Post.find({})
      .populate("user")
      .populate({
        path: "comment",
        populate: { path: "user" },
        populate: { path: "likes" },
      })
      .populate("comment")
      .populate("likes")
      .exec();

    const user = await User.find({});

    const currentUser = await User.findById(req.user._id).populate({
      path: "friendship",
      populate: { path: "from_user" },
      populate: { path: "to_user" },
    });

    for (let i of currentUser.friendship) {
      if (!(i.from_user == currentUser || i.to_user == currentUser)) {
        console.log(i);
      }
    }

    return res.render("home", {
      title: "Social Media App",
      posts: posts,
      all_users: user,
      cUser: currentUser,
    });
  } catch (err) {
    console.log("Error in Fetching Post and all users: ", err);
    return res.redirect("/");
  }
};
