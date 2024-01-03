const Message = require("../models/message");
const postMessage = async (req, res) => {
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
};
const getConversation = async (req, res) => {
  try {
    const conversation = await Message.find({
      $or: [{ from: req.params.from, to: req.params.to }, {
        from: req.params.to,
        to: req.params.from,
      }],
    }).sort({ createdAt: -1 }).limit(30);
    res.status(200).send(conversation);
  } catch (err) {
    res.status(500).json({ messge: err.message });
  }
};

module.exports = { postMessage, getConversation };
