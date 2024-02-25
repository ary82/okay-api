const Room = require("../models/room.js");

const getRoom = async (req, res) => {
  try {
    const room = await Room.findOne({
      $or: [{ users: `${req.params.user1} ${req.params.user2}` }, {
        users: `${req.params.user2} ${req.params.user1}`,
      }],
    });
    res.status(200).send(room);
  } catch (err) {
    res.status(500).json({ messge: err.message });
  }
};

module.exports = { getRoom };
