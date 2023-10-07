const express = require('express');
const router = express.Router();
const home_controller = require("../controllers/home_controller");

console.log("Routes are loaded");

router.get("/",home_controller.home);
router.use("/users",require("./users"));
router.use("/posts",require("./posts"));



module.exports = router;