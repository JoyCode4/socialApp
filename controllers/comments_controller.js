const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = async (req, res) => {
  console.log(req.body, req.user._id);
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

      res.redirect("/");
    }
  } catch (err) {
    console.log("Error in creating Post : Error : " + err);
  }
};
