const Message = require("../models/message.js");
const { runGemini } = require("./gemini-config.js");
const postAImessage = async (req, res) => {
  try {
    const conversation = await Message.find({
      $or: [{ from: req.user.username, to: req.body.to }, {
        from: req.body.to,
        to: req.user.username,
      }],
    }).sort({ createdAt: -1 }).limit(5);

    let str = "";
    conversation.toReversed().map((item) => {
      console.log(item.message);
      if (item.from == req.user.username) {
        str += `B: ${item.message}\n`;
      } else if (item.from == req.body.to) {
        str += `A: ${item.message}\n`;
      }
    });
    str += "Predict what B will say\nAnswer: ";

    // Get AI Response
    const aiResponse = await runGemini(str);

    res.status(200).send(aiResponse);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { postAImessage };
