const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
  message: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Message", MessageSchema);
