const Post = require("../../../models/post");
const Comment = require("../../../models/comment");

module.exports.index = async (req, res) => {
  const posts = await Post.find({})
    .sort("-createdAt")
    .populate("user")
    .populate({
      path: "comment",
      populate: {
        path: "user",
      },
    });
  return res.status(200).json({
    message: "List of Posts",
    posts: posts,
  });
};

module.exports.destroy = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);

    if (post.user == req.user.id) {
      await Post.findByIdAndDelete(req.params.id);
      await Comment.deleteMany({ post: req.params.id });
      // req.flash("success", "Post Deleted Successfully!");
      // return res.redirect("back");
      return res.status(200).json({
        message: "Post Deleted Successfully",
        post: post,
      });
    } else {
      return res.status(401).json({
        message: "You can't delete this post!",
      });
    }
  } catch (err) {
    // console.log("Error while deleting Post: " + err);
    // return res.redirect("back");
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
