const User = require("../models/user");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    const result = await user.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ messge: err.message });
  }
};

const loginUser = async(req, res) => {

}

module.exports = { getUsers, createUser };
