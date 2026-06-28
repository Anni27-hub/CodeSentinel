const express = require("express");

const passport = require("passport");

const router = express.Router();

router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email", "repo"],
  })
);

router.get(
  "/github/callback",

  passport.authenticate("github", {
    failureRedirect: "/login",
  }),

  (req, res) => {
    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
  }
);

router.get("/user", (req, res) => {
  console.log("AUTH USER:", req.user);

  res.json(req.user);
});

// Logout
router.get("/logout", (req, res) => {
  req.logout(() => {
    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.redirect(process.env.FRONTEND_URL);
    });
  });
});

module.exports = router;
