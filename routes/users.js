const express = require("express");
const router = express.Router();
const users_controller = require("../controllers/users_controller");
const passport = require("passport");

router.get(
  "/profile/:id",
  passport.checkAuthentication,
  users_controller.profile
);

router.get("/sign-up", users_controller.signUp);
router.get("/sign-in", users_controller.signIn);
router.post("/create", users_controller.create);
router.post("/update/:id", users_controller.update);
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  users_controller.createSession
);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/users/sign-in" }),
  users_controller.createSession
);

// here I have wrote my own middleware to logout as per the document of passport.js
// As per sir logic it is getting error
router.get("/sign-out", passport.setLogout, users_controller.destroySession);

module.exports = router;
