require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;

db.on("error", (e) => console.log(e));
db.once("open", () => console.log("connected to DB"));

const loginRoute = require("./routes/login");
const signupRoute = require("./routes/signup");
app.use("/login", loginRoute);
app.use("/signup", signupRoute);
app.listen(3000);
