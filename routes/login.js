const express = require("express");
const router = express.Router();
const passport = require("passport");
const session = require("express-session");
const { getUsers, initPassport } = require("../controllers/user.js");

initPassport(passport);
router.use(express.json());
router.use(session({
  secret: "efdsvesrvrev",
  resave: false,
  saveUninitialized: false,
}));
router.use(passport.initialize());
router.use(passport.session());

// Features:
// 1. login users - POST methos on login
// 2. create users - POST method on signup
router.get("/check", (req, res) => {
  res.json({ message: req.isAuthenticated(), user: req.user });
});
router.get("/", getUsers);
router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.json({ message: "logged out" });
  });
});

router.post(
  "/",
  passport.authenticate("local"),
);
function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
    res.json({ message: "yes, logged in" });
    return next();
  }
  res.json({ message: "not logged in" });
}

module.exports = router;
