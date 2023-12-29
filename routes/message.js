const express = require("express");
const router = express.Router();
const Message = require("../models/message");

router.use(express.json());
router.post("/message/send", async (req, res) => {
  try {
    const message = new Message({
      from: req.user.username,
      to: req.body.to,
      message: req.body.message,
    });
    const result = await message.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ messge: err.message });
  }
});

router.post("/conversation", async (req, res) => {
  try {
    const conversation = await Message.find({
      from: req.body.from,
      to: req.body.to,
    }).sort({ createdAt: -1 }).limit(20);
    res.status(200).send(conversation);
  } catch (err) {
    res.status(500).json({ messge: err.message });
  }
});
module.exports = router;
