require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const User = require("./models/user.js");

mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;

db.on("error", (e) => console.log(e));
db.once("open", () => console.log("connected to DB"));
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/", async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });
    const result = await user.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ messge: err.message });
  }
});
app.listen(3000);
