const Like = require("../models/like");
const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.toggleLike = async (req, res) => {
  try {
    let likeable;
    let deleted = false;

    if (req.query.type == "Post") {
      likeable = await Post.findById(req.query.id);
    } else {
      likeable = await Comment.findById(req.query.id);
    }

    const existingLike = await Like.findOne({
      user: req.user._id,
      likeable: req.query.id,
      onModel: req.query.type,
    });

    if (existingLike) {
      likeable.likes.pull(existingLike._id);
      likeable.save();

      await Like.findOneAndDelete({
        user: req.user._id,
        likeable: req.query.id,
        onModel: req.query.type,
      });
      deleted = true;
    } else {
      const newLike = await Like.create({
        user: req.user._id,
        likeable: req.query.id,
        onModel: req.query.type,
      });

      likeable.likes.push(newLike._id);
      likeable.save();
    }

    return res.status(200).json({
      message: "Request successful!",
      data: {
        deleted: deleted,
      },
    });

    // return res.redirect("back");
  } catch (err) {
    console.log("Error in Toggle Like: ", err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports.create = (req, res) => {};
