const express = require("express");
const router = express.Router();
const Room = require("../models/room");

router.use(express.json());
router.post("/room", async (req, res) => {
  try {
    const room = await Room.findOne({
      $or: [{ users: `${req.body.users[0]} ${req.body.users[1]}` }, {
        users: `${req.body.users[1]} ${req.body.users[0]}`,
      }],
    });
    res.status(200).send(room);
  } catch (err) {
    res.status(500).json({ messge: err.message });
  }
});

module.exports = router;
