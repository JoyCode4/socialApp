const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = async (req, res) => {
  //   console.log(req.user);
  //   console.log(req.body);
  try {
    if (!req.user) {
      return res.redirect("/users/sign-in");
    } else {
      const post = await Post.create({
        content: req.body.content,
        user: req.user._id,
      });
      // console.log(post);

      if (req.xhr) {
        return res.status(200).json({
          data: {
            post: post,
          },
          message: "Post Created!",
        });
      }
      req.flash("success", "Post Added Successfully!");
      return res.redirect("back");
    }
  } catch (err) {
    console.log("Error while creating post: " + err);
    return res.redirect("back");
  }
};

module.exports.destroy = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      if (post.user.toString() === req.user.id) {
        await Post.findByIdAndDelete(req.params.id);

        await Comment.deleteMany({ post: req.params.id });

        if (req.xhr) {
          return res.status(200).json({
            data: {
              post_id: req.params.id,
            },
            message: "Post Deleted!",
          });
        }

        req.flash("success", "Post Deleted Successfully!");
        return res.redirect("back");
      }
      return res.redirect("back");
    }
  } catch (err) {
    console.log("Error while deleting Post: " + err);
    return res.redirect("back");
  }
};
