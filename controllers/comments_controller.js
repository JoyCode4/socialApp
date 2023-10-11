const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = async (req, res) => {
  // console.log(req.body, req.user._id);
  try {
    const post = await Post.findById(req.body.post);
    if (post) {
      const comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });

      post.comment.push(comment);
      post.save();

      return res.redirect("/");
    }
  } catch (err) {
    console.log("Error in creating Post : Error : " + err);
    return res.redirect("/");
  }
};

module.exports.destroy = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    // console.log(comment);
    if (comment) {
      if (comment.user.toString() == req.user.id) {
        const postId = await comment.post;

        await Comment.findByIdAndDelete(req.params.id);

        await Post.findByIdAndUpdate(postId, {
          $pull: { comment: req.params.id },
        });

        return res.redirect("back");
      }
      return res.redirect("back");
    }
  } catch (err) {
    console.log("Error in deleting comment : " + err);
    return res.redirect("back");
  }
};
