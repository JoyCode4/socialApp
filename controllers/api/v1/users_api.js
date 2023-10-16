const User = require("../../../models/user");
const jwt = require("jsonwebtoken");

module.exports.createSession = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || user.password != req.body.password) {
      return res.status(422).json({
        message: "invalid password or username",
      });
    }

    return res.status(200).json({
      message: "Sign in Successfully, here is your token, please keep it safe!",
      data: {
        token: jwt.sign(user.toJSON(), "socialApp", {
          expiresIn: "10000",
        }),
      },
    });
  } catch (err) {
    console.log("Error creating session: " + err);
  }
};
