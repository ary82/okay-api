require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");
const { createServer } = require("http");

app.use(cors({ origin: true, credentials: true }));
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: true,
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
});

instrument(io, {
  auth: false,
  mode: "development",
});

mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;
db.on("error", (e) => console.log(e));
db.once("open", () => console.log("connected to DB"));

// ROUTES
const userRoute = require("./routes/user");
const messageRoute = require("./routes/message");
app.use("/", userRoute);
app.use("/", messageRoute);

// app.listen(3000);
httpServer.listen(3000);
