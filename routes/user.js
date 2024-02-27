require("dotenv").config();
const express = require("express");
const router = express.Router();
const passport = require("passport");
const session = require("express-session");
const { getUsers, initPassport, createUser, logoutUser } = require(
  "../controllers/user.js",
);
const MongoStore = require('connect-mongo')(session);

initPassport(passport);
router.use(express.json());
router.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  saveUninitialized: true,
  store: new MongoStore({
    url: `${process.env.MONGO_URL}`, //YOUR MONGODB URL
    ttl: 14 * 24 * 60 * 60,
    autoRemove: 'native'
  })
}));
router.use(passport.initialize());
router.use(passport.session());

router.get("/users", getUsers);

router.post("/signup", createUser);
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({ success: true, username: req.user.username });
});

router.post("/logout", logoutUser);

router.get("/checkuser", (req, res) => {
  if (!req.isAuthenticated()) {
    res.json({ loggedIn: false, username: "" });
  } else {
    res.json({ loggedIn: true, username: req.user.username });
  }
});

module.exports = router;
