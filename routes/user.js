const express = require("express");
const router = express.Router();

const { addPostUser, getUser } = require("../controllers/userController");

router.post("/createUser", addPostUser); //POST
router.post("/login", getUser);

module.exports = router;
