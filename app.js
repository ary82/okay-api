require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;
db.on("error", (e) => console.log(e));
db.once("open", () => console.log("connected to DB"));

app.get("/", (req, res) => {
  res.send({ "hi": "hello" });
});
app.use(express.json());
app.listen(3000);
