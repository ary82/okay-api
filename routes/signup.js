const express = require("express");
const router = express.Router();

const { createUser } = require("../controllers/user.js");
router.use(express.json());

// Features:
// 1. login users - POST methos on login
// 2. create users - POST method on signup

router.post("/", createUser);

module.exports = router;
