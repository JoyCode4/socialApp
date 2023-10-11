const express = require('express');
const router = express.Router();
const comments_controller = require("../controllers/comments_controller");

router.post("/create",comments_controller.create);

module.exports = router;