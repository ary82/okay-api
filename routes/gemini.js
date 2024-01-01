const express = require("express");
const router = express.Router();
const { postAImessage } = require("../controllers/gemini.js");

router.use(express.json());
router.post("/ai", postAImessage);

module.exports = router;
