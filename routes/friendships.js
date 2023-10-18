const express = require("express");
const router = express.Router();
const friendship_controller = require("../controllers/friendships_controller");
router.get("/add/:id", friendship_controller.addFriend);

module.exports = router;
