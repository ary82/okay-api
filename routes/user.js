const express = require("express");
const router = express.Router();
const passport = require("passport");
const session = require("express-session");
const { getUsers, initPassport, createUser } = require(
  "../controllers/user.js",
);

initPassport(passport);
router.use(express.json());
router.use(session({
  secret: "efdsvesrvrev",
  resave: false,
  saveUninitialized: false,
}));
router.use(passport.initialize());
router.use(passport.session());


// ONLY FOR DEVELOPMENT, REMOVE AT PRODUCTION
router.get("/users", getUsers);

router.post("/signup", createUser);
router.post("/login", passport.authenticate("local"));

router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.json({ message: "logged out" });
  });
});

router.get("/checkuser", (req, res) => {
  res.json({ message: req.isAuthenticated(), user: req.user });
});


module.exports = router;
