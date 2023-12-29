const User = require("../models/user");
const Room = require("../models/room");
const bcrypt = require("bcrypt");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, { username: 1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    const users = await User.find();
    users.map(async (user) => {
      const room = new Room({
        users: `${req.body.username}${user.username}`,
      });
      await room.save();
    });
    const result = await user.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ messge: err.message });
  }
};

// PASSPORTJS CONFIG
const LocalStrategy = require("passport-local").Strategy;
function initPassport(passport) {
  const authenticateUser = async (email, password, done) => {
    const user = await User.findOne({ email: email });
    if (user == null) {
      return done(null, false, { message: "email not found" });
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "wrong password" });
      }
    } catch (err) {
      return done(err);
    }
  };
  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ _id: id });
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
}
// PASSPORTJS CONFIG ENDS

const logoutUser = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.json({ wasLoggedIn: false, message: "Already logged out" });
    return next();
  }
  req.logout((err) => {
    if (err) {
      res.json({ message: err });
      return next(err);
    }
    res.json({ wasLoggedIn: true, message: "logged out" });
  });
};

module.exports = { getUsers, createUser, initPassport, logoutUser };
