const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = async (req, res) => {
  //   console.log(req.user);
  //   console.log(req.body);
  if (!req.user) {
    return res.redirect("/users/sign-in");
  } else {
    const post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    // console.log(post);
    return res.redirect("back");
  }
};

module.exports.destroy = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      if (post.user == req.user.id) {
        await Post.findByIdAndDelete(req.params.id);

        await Comment.deleteMany({ post: req.params.id });

        return res.redirect("back");
      }
      return res.redirect("back");
    }
  } catch (err) {
    console.log("Error while deleting Post: " + err);
  }
};
