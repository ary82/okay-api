const mongoose = require("mongoose");

const RoomSchema = mongoose.Schema({
  users: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Room", RoomSchema);
