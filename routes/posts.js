const express = require('express');
const router = express.Router();
const posts_controller = require("../controllers/posts_controller");

router.get("/",posts_controller.posts);

module.exports = router;