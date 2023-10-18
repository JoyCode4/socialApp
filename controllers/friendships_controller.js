const Friendship = require("../models/friendship");
const User = require("../models/user");

module.exports.addFriend = async (req, res) => {
  console.log(req.params.id);
  try {
    const user = await User.findById(req.user._id);
    const friend = await User.findById(req.params.id);

    const existingCheck = await Friendship.findOne({
      from_user: req.user._id,
      to_user: req.params.id,
    });
    if (existingCheck) {
      return res.status(301).json({
        message: "Already a friend",
      });
    } else {
      const friendship = await Friendship.create({
        from_user: req.user._id,
        to_user: req.params.id,
      });
      user.friendship.push(friendship);
      user.save();
      friend.friendship.push(friendship);
      friend.save();
      return res.status(200).json({
        friendship: friendship,
        message: "Friend is added to friendship!",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};
