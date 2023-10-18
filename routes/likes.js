const express = require("express");
const router = express.Router();
const likes_controller = require("../controllers/likes_conroller");

// router.post("/create", likes_controller.create);
router.post("/toggle", likes_controller.toggleLike);

module.exports = router;
