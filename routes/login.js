const express = require("express");
const router = express.Router();

const { getUsers, createUser } = require("../controllers/user.js");
router.use(express.json());

// Features:
// 1. login users - POST methos on login
// 2. create users - POST method on signup
router.get("/", getUsers);

router.post("/", createUser);

module.exports = router;
