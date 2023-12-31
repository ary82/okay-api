const express = require("express");
const router = express.Router();
const { getRoom } = require("../controllers/room");

router.use(express.json());
router.get("/room/:user1/:user2", getRoom);

module.exports = router;
