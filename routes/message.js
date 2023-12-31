const express = require("express");
const router = express.Router();
const { postMessage, getConversation } = require("../controllers/message");

router.use(express.json());

router.post("/message", postMessage);
router.get("/conversation/:from/:to", getConversation);

module.exports = router;
