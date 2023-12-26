const express = require("express");
const router = express.Router();
const passport = require("passport");
const session = require("express-session");
const { getUsers, initPassport, createUser, logoutUser } = require(
  "../controllers/user.js",
);

initPassport(passport);
router.use(express.json());
router.use(session({
  secret: "efdsvesrvrev",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 864000000 },
}));
router.use(passport.initialize());
router.use(passport.session());

router.get("/users", getUsers);

router.post("/signup", createUser);
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({ message: "logged in", username: req.user.username });
});

router.post("/logout", logoutUser);

router.get("/checkuser", (req, res) => {
  if (!req.isAuthenticated()) {
    res.send(false);
  }
  res.send(req.user);
  res.json({ message: req.isAuthenticated(), user: req.user });
});

module.exports = router;
